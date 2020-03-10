import React from 'react'

// Host Game component.
// This is where a user starts a game by hosting it.

/*
    TODO
    Pass custom events to input, button
    Populate Settings - requires game design
*/

const HostGameComponent = ({
    home: [homeLabel, homeCallback],
    lobby: [lobbyLabel, lobbyCallback],
    destroyLobby,
    createLobby
}) =>
(<div>
    <div>
        <p>Settings will go here</p>
    </div>
    Name: <input></input>
    <button onClick = {() => destroyLobby()}>destroyLobby</button>
    <button onClick = {() => createLobby()}> Create Lobby</button>
    <button onClick = {homeCallback}>{homeLabel}</button>
    <button onClick = {lobbyCallback}>{lobbyLabel}</button>
</div>)

export default HostGameComponent