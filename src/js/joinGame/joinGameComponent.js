import React from 'react'
import StyledButton from '../../stylingComponents/StyledButton'
import ErrorContainer from '../error/errorContainer'
import DivBox from '../../stylingComponents/DivBox'

// Join Game component.
// Shown when a player wants to join a game.
const JoinGameComponent = ({
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
const margins = {margin: "10px 10px 10px 10px"}

return (
<DivBox column = {true}>
    {(myError != null) &&
    <ErrorContainer error={myError}/>}
        <p style = {margins}>
            Your name:
        </p>
        {loggedIn ? 
            <b style = {margins}>
                {name}
            </b> 
            :
            <input 
                style = {margins}
                onChange = {e => setText(e.target.value)} 
                value = {text}/>
        }
        <p style = {margins}>
            Game link:
        </p>
        <input 
            style={
                Object.assign({}, 
                    margins, 
                    {textTransform: 'uppercase'}
                    )}
            onChange = {e => setCode(e.target.value) } 
            value = {code}/>
    <StyledButton 
        color = 'red' 
        style = {margins} 
        onClick = {() => {
            joinLobby(code.toUpperCase(), loggedIn ? name : text)
            .then(val => {console.log(val); lobbyCallback()})
            .catch(error => {console.log(error); setError(error)})
        }}>{lobbyLabel}</StyledButton>
</DivBox>)}

export default JoinGameComponent