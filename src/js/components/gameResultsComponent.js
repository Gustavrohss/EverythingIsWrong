import React from 'react'

// Game results component
const GameResultsComponent = ({
    scores
}) =>
// TODO
// Show the winner in a more stylish way than "top of list"
// Winners deserve the clout
(<div className = "flexContainer mainContent">
    {scores && scores.length > 0 ?
        <p>The winner is <b>{scores[0].name}</b>!</p>
        :
        <p>Trying to reconnect...</p>
    }
    <ol>
        {scores
            .map(player => <p key = {player.playerID}> {player.name}: <b>{player.score}</b></p>)
        }
    </ol>
</div>)

export default GameResultsComponent
