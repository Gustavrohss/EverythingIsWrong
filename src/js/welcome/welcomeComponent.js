import React from 'react'
import styled from 'styled-components';
import JoinGameButton from '/home/kostas/Courses2020/DH2642_Dynamic_Web/EverythingIsWrong/src/stylingBootstrap/JoinGameButton.js';
import HostGameButton from '/home/kostas/Courses2020/DH2642_Dynamic_Web/EverythingIsWrong/src/stylingBootstrap/HostGameButton.js'
import HighScoresButton from '../../stylingBootstrap/HighScoresButton.js';
import AboutButton from '/home/kostas/Courses2020/DH2642_Dynamic_Web/EverythingIsWrong/src/stylingBootstrap/AboutButton.js'

// The welcome screen component
const WelcomeComponent = ({
    host: [hostLabel, hostCallback],
    join: [joinLabel, joinCallback],
    about: [aboutLabel, aboutCallback],
    highScores: [highScoresLabel, highScoresCallback]
}) =>
(<React.Fragment>
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
</React.Fragment>)

export default WelcomeComponent
