import React, { useState } from 'react'

const Player = ({initialName, symbol, isActive, onChangeName}) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEdit(){
        setIsEditing(editing => !editing);
        if(isEditing){
           onChangeName(symbol, playerName);
        }
    }

    function handleChange(e){
        console.log(e);
        setPlayerName(e.target.value);
    }

    let editableName = <span className="player-name">{playerName}</span>;  

    if(isEditing){
        editableName= (<input type='text' required value={playerName} onChange={handleChange}/>);

    }
     return(  
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editableName}
                <span className="player-symbol">{symbol}</span>
                
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}

export default Player
