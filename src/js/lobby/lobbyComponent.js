import React from 'react'

// Returns a list of players (currently seen only as strings) as table rows
// Two players per row
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

const LobbyComponent = ({
    players,
    game: [gameLabel, gameCallbac]
}) =>
(<div>
    <button onClick = {gameCallbac}>{gameLabel}</button>
    <p>Game mode/title</p>
    <b>Host</b>
    <table><tbody>
        {playersToRows(players)}
    </tbody></table>
</div>)

export default LobbyComponent
