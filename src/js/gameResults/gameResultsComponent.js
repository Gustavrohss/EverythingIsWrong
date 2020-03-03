import React from 'react'

const GameResultsComponent = ({
    home: [homeLabel, homeCallback],
    game: [gameLabel, gameCallback],
    scores = [
        ["Alice", 10], ["Bob", 5], 
        ["Carla", 20], ["Duncan", 12], 
        ["Erika", 7], ["Fandango", 3000]]
}) => 
// TODO
// Show the winner in a more stylish way than "top of list"
// Winners deserve the clout
(<div>
    <p>We have a winner! Congratulations, [actually the winner isn't calculated already!]</p>
    <ol>
        {scores
            .sort(([p1, score1], [p2, score2]) => score2 - score1)
            .map(([player, score], index) => <p key = {index}> {player}: <b>{score}</b></p>)
        }
    </ol>
    <button onClick={homeCallback}>{homeLabel}</button>
    <button onClick={gameCallback}>{gameLabel}</button>
</div>)

export default GameResultsComponent