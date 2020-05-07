import React from 'react'
import ErrorContainer from '../error/errorContainer'
import StyledButton from '../../stylingComponents/StyledButton'
import DivBox from '../../stylingComponents/DivBox'

// Host Game component.
// This is where a user starts a game by hosting it.
const HostGameComponent = ({
    lobby: [lobbyLabel, lobbyCallback],
    createLobby,
    loggedIn,
    name
}) => {

    const [text, setText] = React.useState("")
    const [choice, setChoice] = React.useState("") //Not used. Choose what type of images
    const [num_questions, setNum_questions] = React.useState(2) //Not used. Set the number of questions
    const [myError, setError] = React.useState(null)
    
    return (<DivBox column = {true}>
        {(myError != null) &&
        <ErrorContainer error={myError}/>}

        Your name: 
        {loggedIn ? 
            <b>{name}</b> :
            <input onChange = {e => setText(e.target.value)} value={text}></input>
        }
        <StyledButton color = 'green' onClick = {() => {
            createLobby(loggedIn ? name : text, {
                                gameType: choice, 
                                questions: num_questions
                            })
            .then(val => {console.log(val); lobbyCallback()})
            .catch(error => {console.log(error); setError(error)})
                        }}>{lobbyLabel}</StyledButton>
    </DivBox>
    )
}

export default HostGameComponent