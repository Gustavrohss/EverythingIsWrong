import React from 'react'

// Host Game component.
// This is where a user starts a game by hosting it.
const HostGameComponent = ({
    home: [homeLabel, homeCallback],
    lobby: [lobbyLabel, lobbyCallback],
    destroyLobby,
    createLobby,
    galleries: [gallery_label, gallery_selection]
}) => {

    const [text, setText] = React.useState("")
    const [choice, setChoice] = React.useState("")
    const [num_questions, setNum_questions] = React.useState(2)
    //Add settings: galleries nad modes.
    //Possible extension using react Semantic UI for nice stuff: https://react.semantic-ui.com/
    return (<div>
        <div className="selection" id="gallery-list">
            <label htmlFor="galleries">{gallery_label}</label>
            <select id="galleries" onChange = {e => setChoice(e.target.value)} value={choice}>
                {gallery_selection.map( ([name, val]) => <option key = {name} value = {val}>{name}</option>)}
            </select>
        </div>
        Name: <input onChange = {e => setText(e.target.value)} value={text}></input>
        <button onClick = {() => destroyLobby(text)}>destroyLobby</button>
        <button onClick = {() => createLobby(text, {gameType: choice, 
                                                    questions: num_questions
                                                    })}> Create Lobby</button>
        <button onClick = {homeCallback}>{homeLabel}</button>
        <button onClick = {lobbyCallback}>{lobbyLabel}</button>
    </div>)
}

export default HostGameComponent