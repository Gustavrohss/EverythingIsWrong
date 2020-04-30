import React from 'react'

// Returns a list of players (currently seen only as strings) as table rows
// Two players per row
// This is for the visual flare
const playersToRows = players => {
    // Will be mapped to rows
    let pairs = []
    let i = 0
    if (players.length === 0) return null
    // Two at a time
    while (i < players.length - 1) {
        pairs.push([players[i], players[i + 1]])
        i += 2
    }
    // In case there's one left
    if (i < players.length) pairs.push([players[i]])
    // Pair to row
    return pairs.map((pair, i) =>
    // Player in pair to td
    <tr key = {i}>
        {pair.map(player => <td key={player.playerID} className={player.playerID === "host" ? "host" : ""}>{player.name}</td>)}
    </tr>
    )
}

// Lobby component
// What the player, and host, sees when waiting to start a game
const LobbyComponent = ({
    players,
    lobbyID,
    isHost,
    game: [gameLabel, gameCallbac],
}) =>
(<div>
    {isHost && <button onClick =  {gameCallbac}>{gameLabel}</button>}
    <p>Game code: {lobbyID}</p>
    <table><tbody>
        {playersToRows(players)}
    </tbody></table>
</div>)

export default LobbyComponent
