import React from 'react'
import ErrorContainer from '../containers/errorContainer'
import StyledButton from '../styledComponents/StyledButton'
import DivBox from '../styledComponents/DivBox'

// Host Game component.
// This is where a user starts a game by hosting it.
const HostGameComponent = ({
    lobby: [lobbyLabel, lobbyCallback],
    createLobby,
    loggedIn,
    name
}) => {

    const [text, setText] = React.useState("")
    const [myError, setError] = React.useState(null)
    
    return (<DivBox column = {true}>
        {(myError != null) &&
        <ErrorContainer error={myError}/>}

        Your name: 
        {loggedIn ? 
            <b>{name}</b> :
            <input onChange = {e => setText(e.target.value)} value={text}></input>
        }
        <StyledButton color = 'green' 
        onClick = {() => {
            createLobby(loggedIn ? name : text)
            .then(val => {lobbyCallback()})
            .catch(error => {setError(error)})
        }}>
            {lobbyLabel}
        </StyledButton>
    </DivBox>
    )
}

export default HostGameComponent