const GameBoard = ({onSelectSquare, board}) => {
 
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => { //using this function form to update previous state we will be working on the latest state at the time, update i applied
    //         const updateBoard=[...prevGameBoard.map((innerArray => [...innerArray]))];
    //         updateBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updateBoard;
    //         //so using this approach we are updating the state in immutable way 
    //     });

    //     onSelectSquare();
    // }

  return (<ol id="game-board">
            {board.map((row,rowIndex)=> <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex)=> <li key={colIndex}>
                        <button onClick={()=>onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                    </li>)}
                </ol>    
            </li>)}
        </ol>
  )
}

export default GameBoard