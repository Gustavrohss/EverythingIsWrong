import React from 'react'
import ReactList from 'react-list'

// Lobby component
// What the player, and host, sees when waiting to start a game
const LobbyComponent = ({
    players,
    lobbyID,
    isHost,
    game: [gameLabel, gameCallback],
}) =>
(<div className = "flexContainer mainContent">
    <p className = "bigFont">Warning! Going to Home, About, or High Scores during a game will cause you to leave!</p>
    {isHost && <button className = "generalButton" onClick =  {gameCallback}>{gameLabel}</button>}
    <b className = "bigFont">Game code: {lobbyID}</b>
    <p className = "bigFont">Players:</p>
    {/** Run npm install */}
    <ReactList
        itemRenderer = {(index, key) => {
            const {playerID, name} = players[index]
            return <p key = {key} className = {playerID + " bigFont"}>
                {name}
            </p>}}
        length = {players.length}
    />
</div>)

export default LobbyComponent
