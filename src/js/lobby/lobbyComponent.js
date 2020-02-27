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
    return pairs.map(pair => 
    // Player in pair to td
    <tr>
        {pair.map(player => <td>{player}</td>)}
    </tr>
    )
}

const LobbyComponent = ({
    players = []
}) =>
(<div>
    <p>Game mode/title</p>
    <b>Host</b>
    <table><tbody>
        {playersToRows(players)}
    </tbody></table>
</div>)

export default LobbyComponent