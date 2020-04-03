import React from 'react'
import styled from 'styled-components';
import JoinGameButton from '../../stylingComponents/JoinGameButton.js';
import HostGameButton from '../../stylingComponents/HostGameButton.js'
import HighScoresButton from '../../stylingComponents/HighScoresButton.js';
import AboutButton from '../../stylingComponents/AboutButton.js'
import DivBox from '../../stylingComponents/InitialBoard.js'
import { NavigationBar } from '/home/kostas/Courses2020/DH2642_Dynamic_Web/EverythingIsWrong/src/stylingComponents/NavigationBar'
// The welcome screen component
const WelcomeComponent = ({
    host: [hostLabel, hostCallback],
    join: [joinLabel, joinCallback],
    about: [aboutLabel, aboutCallback],
    highScores: [highScoresLabel, highScoresCallback]
}) =>
(<DivBox>
 <NavigationBar>
 </NavigationBar>

    <p>Welcome to Everything is Wrong!</p>
    <table><tbody>
        <tr>
            <td>
                <JoinGameButton onClick = {joinCallback}>{joinLabel}</JoinGameButton>
            </td>
            <td>
                <HostGameButton onClick = {hostCallback}>{hostLabel}</HostGameButton>
            </td>
        </tr>
        <tr>
            <td>
                <HighScoresButton onClick = {highScoresCallback}>{highScoresLabel}</HighScoresButton>
            </td>
            <td>
                <AboutButton onClick = {aboutCallback}>{aboutLabel}</AboutButton>
            </td>
        </tr>
    </tbody></table>
</DivBox>)

export default WelcomeComponent
