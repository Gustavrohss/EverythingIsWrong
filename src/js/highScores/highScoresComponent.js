import React from 'react'
import {HighScoreTable, TabRow, TabData} from '../../stylingComponents/HighScoreStyling'
import LoaderContainer from '../loader/loaderContainer'

// High scores component
const HighScoreComponent = ({
    isLoading,
    highScores,
    getHighScores
}) => {

    if (highScores.length === 0) getHighScores()

    return isLoading ? <LoaderContainer/>
    :
    <HighScoreTable><tbody>
        <tr>
            <th>#</th>
            <th>Player</th>
            <th>Score</th>
        </tr>
        {highScores
            .sort((s1, s2) => s2.score - s1.score)
            .map(({name, score}, idx) => 
                <TabRow key = {idx}>
                    <TabData width = {75}>{idx + 1}</TabData>
                    <TabData>{name}</TabData>
                    <TabData width = {100}>{score}</TabData>
                </TabRow>)}
    </tbody></HighScoreTable>

}

export default HighScoreComponent