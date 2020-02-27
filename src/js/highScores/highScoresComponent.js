import React from 'react'

const HighScoreComponent = ({
    scores = [[]] // scores = [[player, score], [player, score], [player, score]...]
}) => 
(<div>
    <div>
        <p>If we have game modes, this nested component might contain some filtering options!</p>
    </div>
    <ol>
        {scores.sort(
            ([p1, score1], [p2, score2]) => score2 - score1
        ).map(([player, score]) =>
        <p>{player}:\t <b>{score}</b></p>
        )}
    </ol>
</div>)

export default HighScoreComponent