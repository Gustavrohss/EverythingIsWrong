import React from 'react'
import StyledButton from '../../stylingComponents/StyledButton'
import LoaderContainer from '../loader/loaderContainer'

// High scores component
const HighScoreComponent = ({
    home: [homeLabel, homeCallback],
    available,
    highScores,
    populate
}) => {

    populate()

    return <div>
        <StyledButton color = 'lightblue' onClick = {homeCallback}>{homeLabel}</StyledButton>
        {available ?
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
        :
        <LoaderContainer/>    
        }
    </div>
}

export default HighScoreComponent