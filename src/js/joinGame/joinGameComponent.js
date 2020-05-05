import React from 'react'
import StyledButton from '../../stylingComponents/StyledButton'
import ErrorContainer from '../error/errorContainer'

// Join Game component.
// Shown when a player wants to join a game.
const JoinGameComponent = ({
    home: [homeLabel, homeCallback],
    lobby: [lobbyLabel, lobbyCallback],
    joinLobby,
    loggedIn,
    name
}) => {
// State hooks
// https://reactjs.org/docs/hooks-state.html
const [text, setText] = React.useState("");
const [code, setCode] = React.useState("");
const [myError, setError] = React.useState(null)

return (
<div>
    <table><tbody>
        <tr>
            <td>Your name:</td>
            <td>
                {loggedIn ? 
                <b>{name}</b> :
                <input 
                    onChange = {e => setText(e.target.value)} 
                    value = {text}/>
            }</td>
        </tr>
        <tr>
            <td>Game link:</td>
            <td>
                <input 
                style={{textTransform: "uppercase"}} 
                onChange = {e => setCode(e.target.value) } 
                value = {code}/>
            </td>
        </tr>
    </tbody></table>
    <StyledButton color = 'red' onClick = {() => {
            const acceptUser = loggedIn || text.length > 0
            if (acceptUser) {
                joinLobby(code.toUpperCase(), loggedIn ? name : text)
                .then(val => {console.log(val); lobbyCallback()})
                .catch(error => {console.log(error); setError(error)})
            } else {
                setText("Sorry, that username is invalid!")
            }
        }}>{lobbyLabel}</StyledButton>
    <StyledButton color = 'blue' onClick = {homeCallback}>{homeLabel}</StyledButton>
    {(myError != null) &&
        <ErrorContainer error={myError}/>}
</div>)}

export default JoinGameComponent