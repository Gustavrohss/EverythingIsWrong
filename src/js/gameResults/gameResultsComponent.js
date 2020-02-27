import React from 'react'

const GameResultsComponent = ({
    home: [homeLabel, homeCallback],
    game: [gameLabel, gameCallback],
    scores = [[]] // scores = [[player, score], [player, score], [player, score]...]
}) => 
// TODO
// Show the winner in a more stylish way than "top of list"
// Winners deserve the clout
(<div>
    <p>We have a winner!</p>
    <ol>
        {scores.sort(
            ([p1, score1], [p2, score2]) => score2 - score1
        ).map(([player, score]) =>
        <p>{player}:\t <b>{score}</b></p>
        )}
    </ol>
    <button onClick={homeCallback}>{homeLabel}</button>
    <button onClick={gameCallback}>{gameLabel}</button>
</div>)

export default GameResultsComponent