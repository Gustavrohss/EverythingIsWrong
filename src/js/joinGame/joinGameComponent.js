import React from 'react'

// Join Game component.
// Shown when a player wants to join a game.
const JoinGameComponent = ({
    home: [homeLabel, homeCallback],
    lobby: [lobbyLabel, lobbyCallback],
    joinLobby,
    loggedIn: [showName, name]
}) => {
// State hooks
// https://reactjs.org/docs/hooks-state.html
const [text, setText] = React.useState("");
const [code, setCode] = React.useState("");

return (
<div>
    <div>
        Your name: 
        {showName ? 
            <b>{name}</b> :
            <input onChange = {e => setText(e.target.value)} value = {text}></input>
        }

        Game link: <input style={{ textTransform: "uppercase"}} onChange = {e => setCode(e.target.value) } value = {code}></input>
    </div>
    <button onClick = {() => {
            console.log(joinLobby(code.toUpperCase(), text))
            lobbyCallback()
        }}>Join</button>
    <button onClick = {homeCallback}>{homeLabel}</button>
</div>)}

export default JoinGameComponent