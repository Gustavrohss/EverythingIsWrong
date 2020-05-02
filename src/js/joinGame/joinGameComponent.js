import React from 'react'

// Join Game component.
// Shown when a player wants to join a game.
const JoinGameComponent = ({
    home: [homeLabel, homeCallback],
    lobby: [lobbyLabel, lobbyCallback],
    joinLobby
}) => {
// State hooks
// https://reactjs.org/docs/hooks-state.html
const [text, setText] = React.useState("");
const [code, setCode] = React.useState("");
const [isNotOK, setIsNotOK] = React.useState(false)

return (
<div>
    <div>
        Your name: <input onChange = {e => setText(e.target.value)} value = {text}></input>
        Game link: <input style={{ textTransform: "uppercase"}} onChange = {e => setCode(e.target.value) } value = {code}></input>
    </div>
    <button onClick = {() => {
            joinLobby(code.toUpperCase(), text)
            .then(val => {console.log(val); lobbyCallback()})
            .catch(error => {console.log(error); setIsNotOK(true)})
        }}>Join</button>
    <button onClick = {homeCallback}>{homeLabel}</button>
    {isNotOK &&
        <h3 className="error"> { "placeholder: User must contain letters! or something else..." } </h3> 
    }
</div>)}

export default JoinGameComponent