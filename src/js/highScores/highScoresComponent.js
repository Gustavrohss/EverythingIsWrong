import React from 'react'

// High scores component
const HighScoreComponent = ({
    home: [homeLabel, homeCallback],
    available,
    highScores,
    populate
}) => {

    populate()

    return <div>
        <button onClick = {homeCallback}>{homeLabel}</button>
        <div>
            <b>High Scores</b>
            <ol>
                {
                    highScores
                        .sort((s1, s2) => s2.score - s1.score)
                        .map(({name, score}, idx) => 
                            <li key = {idx}>
                                <b>{name}:</b> {score}
                            </li>    
                        )
                }
            </ol>
        </div>
    </div>
}

export default HighScoreComponent