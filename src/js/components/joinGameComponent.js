import React from 'react'
import StyledButton from '../styledComponents/StyledButton'
import ErrorContainer from '../containers/errorContainer'
import DivBox from '../styledComponents/DivBox'

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

const styles = {
    input: toUpperCase => ({
        margin: "10px",
        textTransform: toUpperCase ? "uppercase" : ""
    })
}

return (
<DivBox column = {true}>
    {(myError != null) && <ErrorContainer error={myError}/>}
    <p>Your name:</p>
    {loggedIn ? 
        <b>{name}</b> :
        <input 
            style = {styles.input(false)} 
            onChange = {e => setText(e.target.value)} value = {text}/>
    }
    <p>Game link:</p>
    <input 
        style = {styles.input(true)}
        onChange = {e => setCode(e.target.value) } 
        value = {code}/>
    <StyledButton
        color = 'red'
        onClick = {() => {
            joinLobby(code.toUpperCase(), loggedIn ? name : text)
            .then(lobbyCallback)
            .catch(error => {setError(error)})
        }}>{lobbyLabel}</StyledButton>
</DivBox>)}

export default JoinGameComponent