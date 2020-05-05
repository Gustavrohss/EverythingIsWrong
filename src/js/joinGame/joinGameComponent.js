import React from 'react'
import JOIN from '../../stylingComponents/JOIN'
import ErrorContainer from '../error/errorContainer'

// Join Game component.
// Shown when a player wants to join a game.
const JoinGameComponent = ({
    home: [homeLabel, homeCallback],
    lobby: [lobbyLabel, lobbyCallback],
    joinLobby,
    loggedIn: [isLoggedIn, name]
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
        {isLoggedIn ? 
            <b>{name}</b> :
            <input onChange = {e => setText(e.target.value)} value = {text}></input>
        }

        Game link: <input style={{ textTransform: "uppercase"}} onChange = {e => setCode(e.target.value) } value = {code}></input>
    </div>
    <JOIN onClick = {() => {
            const acceptUser = isLoggedIn || text.length > 0
            if (acceptUser) {
                joinLobby(code.toUpperCase(), isLoggedIn ? name : text)
                .then(val => {console.log(val); lobbyCallback()})
                .catch(error => {console.log(error); setError(error)})
            } else {
                setText("Sorry, that username is invalid!")
            }
        }}>Join</JOIN>
    <JOIN onClick = {homeCallback}>{homeLabel}</JOIN>
    {(myError != null) &&
        <ErrorContainer error={myError}/>}
</div>)}

export default JoinGameComponent