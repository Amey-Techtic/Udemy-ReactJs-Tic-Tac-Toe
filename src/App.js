import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X"; //as activePlayer data is from different state(outside of setGameTurns) so we need to save that player in this new playerTurn state.
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O"; //as previous player was assumed to be 'X' then the current player will be 'O'
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  // this approach is called deriving state
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;

}

function deriveWinner(gameBoard, players){

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbolSquare =
      gameBoard[combination[0].row][combination[0].column];
    const secondSymbolSquare =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSymbolSquare =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbolSquare &&
      firstSymbolSquare === secondSymbolSquare &&
      firstSymbolSquare === thirdSymbolSquare
    ) {
      // winner = firstSymbolSquare; //here it shows the symbol of player that won
      winner = players[firstSymbolSquare]; //now it will show the name of player who won the match
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  // const [activePlayer, setActivePlayer]=useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);
  const activePlayer = deriveActivePlayer(gameTurns);

  
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  //this is known as lifting state up
  function handleSelectSquare(rowIndex, colIndex) {
    //this function will be used to dynamically highlight the active players
    // setActivePlayer((curActivePlayer)=>curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns); //as activePlayer data is from different state(outside of setGameTurns) so we need to save that player in this new playerTurn state.

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]; //copying existing turns
      return updatedTurns;
    });
  }

  function handelRestart() {
    setGameTurns([]);
  }

  function hnadlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName, //this is javascript syntax to dynamically set the property
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={hnadlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={hnadlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handelRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
