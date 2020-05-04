import React from 'react'
import ErrorContainer from '../error/errorContainer'

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
const [myError, setError] = React.useState(null)

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
            joinLobby(code.toUpperCase(), text)
            .then(val => {console.log(val); lobbyCallback()})
            .catch(error => {console.log(error); setError(error)})
        }}>Join</button>
    <button onClick = {homeCallback}>{homeLabel}</button>
    {(myError != null) &&
        <ErrorContainer error={myError}/>}
</div>)}

export default JoinGameComponent