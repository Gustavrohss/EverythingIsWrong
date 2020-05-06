import React from 'react'
import StyledButton from '../../stylingComponents/StyledButton'
import LoaderContainer from '../loader/loaderContainer'

// High scores component
const HighScoreComponent = ({
    available,
    highScores,
    populate
}) => {

    populate()

    return <div>
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