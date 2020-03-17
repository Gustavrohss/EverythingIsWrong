import React from 'react'

const GameResultsComponent = ({
    home: [homeLabel, homeCallback],
    game: [gameLabel, gameCallback],
    canContinue,
    scores
}) =>
// TODO
// Show the winner in a more stylish way than "top of list"
// Winners deserve the clout
(<div>
    {(scores && scores.length > 0) ?
      <p>The winner is <b>{scores[0].name}</b>!</p> :
      <p> No players in the game, so there is no winner... </p>}
    <ol>
        {scores
            .map(player => <p key = {player.playerID}> {player.name}: <b>{player.score}</b></p>)
        }
    </ol>
    <button onClick={homeCallback}>{homeLabel}</button>
    <button onClick={gameCallback} disabled={!canContinue}>{gameLabel}</button>
</div>)

export default GameResultsComponent
