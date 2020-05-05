import React from 'react'
import StyledButton from '../../stylingComponents/StyledButton'
import DivBox from '../../stylingComponents/InitialBoard.js'
// The welcome screen component
const WelcomeComponent = ({
    host: [hostLabel, hostCallback],
    join: [joinLabel, joinCallback],
    about: [aboutLabel, aboutCallback],
    highScores: [highScoresLabel, highScoresCallback],
    login: [loginLabel, loginCallback],
    loggedIn,
    name
}) =>
(<DivBox>
    <p>{loggedIn ? 
        "Welcome to Everything is Wrong, " + name + "!" 
        : 
        "Welcome to Everything is Wrong!"}</p>
    <table><tbody>
        <tr>
            <td>
                <StyledButton color = 'blue' onClick = {joinCallback}>{joinLabel}</StyledButton>
            </td>
            <td>
                <StyledButton color = 'red' onClick = {hostCallback}>{hostLabel}</StyledButton>
            </td>
        </tr>
        <tr>
            <td>
                <StyledButton color = 'green' onClick = {highScoresCallback}>{highScoresLabel}</StyledButton>
            </td>
            <td>
                <StyledButton color = 'gold' onClick = {aboutCallback}>{aboutLabel}</StyledButton>
            </td>
        </tr>
        <tr>
            <td>
                <StyledButton color = 'orchid' onClick = {loginCallback}>{loginLabel}</StyledButton>
            </td>
        </tr>
    </tbody></table>
</DivBox>)

export default WelcomeComponent
