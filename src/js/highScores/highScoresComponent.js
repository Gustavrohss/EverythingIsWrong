import React from 'react'
import InitialPageButton from '../../stylingComponents/InitialPageButton'

// High scores component
const HighScoreComponent = ({
    home: [homeLabel, homeCallback],
    // Placeholder
    scores = [
        ["Alice", 10], ["Bob", 5], 
        ["Carla", 20], ["Duncan", 12], 
        ["Erika", 7], ["Fandango", 3000]]
}) => 
(<div>
    <InitialPageButton onClick = {homeCallback}>{homeLabel}</InitialPageButton>
    <div>
        <p>If we have game modes, this nested component might contain some filtering options!</p>
    </div>
    <ol>
        {/* Sort by player score and map to HTML element */}
        {scores
            .sort(([p1, score1], [p2, score2]) => score2 - score1)
            .map(([player, score], index) => <p key = {index}>{player}: <b>{score}</b></p>)
        }
    </ol>
</div>)

export default HighScoreComponent