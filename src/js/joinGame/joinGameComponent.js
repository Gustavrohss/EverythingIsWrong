import React from 'react'
import JOIN from '../../stylingComponents/JOIN'

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
    <JOIN onClick = {() => {
            console.log(joinLobby(code.toUpperCase(), text))
            lobbyCallback()
        }}>Join</JOIN>
    <JOIN onClick = {homeCallback}>{homeLabel}</JOIN>
</div>)}

export default JoinGameComponent