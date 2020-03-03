import React from 'react'

// Join Game component.
// Shown when a player wants to join a game.

/*
    TODO
    Pass custom events to inputs, buttons
    Styling
*/

const JoinGameComponent = ({
    home: [homeLabel, homeCallback],
    lobby: [lobbyLabel, lobbyCallback]
}) =>
(<div>
    <div>
        Name: <input></input>
        Link: <input></input>
    </div>
    <button onClick = {homeCallback}>{homeLabel}</button>
    <button onClick = {lobbyCallback}>{lobbyLabel}</button>
</div>)

export default JoinGameComponent