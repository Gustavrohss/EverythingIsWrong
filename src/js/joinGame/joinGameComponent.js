import React from 'react'

// Join Game component.
// Shown when a player wants to join a game.

/*
    TODO
    Pass custom events to inputs, buttons
    Styling
*/

const JoinGameComponent = ({
    home: [homeLabel, homeCallback],
    lobby: [lobbyLabel, lobbyCallback],
    joinLobby
}) => {
const [text, setText] = React.useState("");
const [code, setCode] = React.useState("");

return (
<div>
    <div>
        Name: <input onChange = {e => setText(e.target.value)}></input>
        Link: <input style={{ textTransform: "uppercase"}} onChange = {e => setCode(e.target.value) }></input>
    </div>
    <button onClick = {() => joinLobby(code.toUpperCase(), text)}>JOIN</button>
    <button onClick = {homeCallback}>{homeLabel}</button>
    <button onClick = {lobbyCallback}>{lobbyLabel}</button>
</div>)}

export default JoinGameComponent