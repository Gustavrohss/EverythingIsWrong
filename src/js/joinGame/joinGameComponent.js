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

return (
<div>
    <div>
        Name: <input onChange = {e => setText(e.target.value)} value = {text}></input>
        Link: <input style={{ textTransform: "uppercase"}} onChange = {e => setCode(e.target.value) } value = {code}></input>
    </div>
    <button onClick = {() => console.log(joinLobby(code.toUpperCase(), text))}>Join</button>
    <button onClick = {homeCallback}>{homeLabel}</button>
    <button onClick = {lobbyCallback}>{lobbyLabel}</button>
</div>)}

export default JoinGameComponent