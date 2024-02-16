import React from 'react'

// here we will log different turns of players in game

const Log = ({turns}) => {

  return (
    <ol id="log">
      {turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row} , {turn.square.col}</li>)}
    </ol>
  )
}

export default Log