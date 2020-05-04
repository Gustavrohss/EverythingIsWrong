import React from 'react'
import ErrorContainer from '../error/errorContainer'

// Host Game component.
// This is where a user starts a game by hosting it.
const HostGameComponent = ({
    home: [homeLabel, homeCallback],
    lobby: [lobbyLabel, lobbyCallback],
    createLobby,
    loggedIn: [isLoggedIn, name]
}) => {

    const [text, setText] = React.useState("")
    const [choice, setChoice] = React.useState("")
    const [num_questions, setNum_questions] = React.useState(2)
    const [myError, setError] = React.useState(null)
    //Add settings: galleries nad modes.
    //Possible extension using react Semantic UI for nice stuff: https://react.semantic-ui.com/
    return (<div>
        Your name: 
        {isLoggedIn ? 
            <b>{name}</b> :
            <input onChange = {e => setText(e.target.value)} value={text}></input>
        }
        <button onClick = {() => {
            createLobby(isLoggedIn ? name : text, {
                                gameType: choice, 
                                questions: num_questions
                            })
            .then(val => {console.log(val); lobbyCallback()})
            .catch(error => {console.log(error); setError(error)})
            }}>Create game</button>
        <button onClick = {homeCallback}>{homeLabel}</button>
        {(myError != null) &&
        <ErrorContainer error={myError}/>}
    </div>
    )
}

export default HostGameComponent