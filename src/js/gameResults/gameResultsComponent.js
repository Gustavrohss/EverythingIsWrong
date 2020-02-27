import React from 'react'

const GameResultsComponent = ({
    scores = [[]] // scores = [[player, score], [player, score], [player, score]...]
}) => 
// TODO
// Show the winner in a more stylish way than "top of list"
// Winners deserve the clout
(<div>
    <p>We have a winner!</p>
    <ol>
        {scores.sort(
            ([_, score1], [_, score2]) => score2 - score1
        ).map(([player, score]) =>
        <p>{player}:\t <b>{score}</b></p>
        )}
    </ol>
</div>)

export default GameResultsComponent