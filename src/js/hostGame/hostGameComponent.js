import React from 'react'

// Host Game component.
// This is where a user starts a game by hosting it.
const HostGameComponent = ({
    home: [homeLabel, homeCallback],
    lobby: [lobbyLabel, lobbyCallback],
    destroyLobby,
    createLobby
}) => {

    const [text,setText] = React.useState("")

    return (<div>
        <div>
            <p>Settings will go here</p>
        </div>
        Name: <input onChange = {e => setText(e.target.value)} value={text}></input>
        <button onClick = {() => destroyLobby(text)}>destroyLobby</button>
        <button onClick = {() => createLobby(text)}> Create Lobby</button>
        <button onClick = {homeCallback}>{homeLabel}</button>
        <button onClick = {lobbyCallback}>{lobbyLabel}</button>
    </div>)
}

export default HostGameComponent