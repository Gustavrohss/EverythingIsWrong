import React from 'react'
import styled from 'styled-components';
import JoinGameButton from '../../stylingComponents/JoinGameButton.js';
import HostGameButton from '../../stylingComponents/HostGameButton.js'
import HighScoresButton from '../../stylingComponents/HighScoresButton.js';
import AboutButton from '../../stylingComponents/AboutButton.js'
import DivBox from '../../stylingComponents/InitialBoard.js'
import { NavigationBar } from '../../stylingComponents/NavigationBar'
// The welcome screen component
const WelcomeComponent = ({
    host: [hostLabel, hostCallback],
    join: [joinLabel, joinCallback],
    about: [aboutLabel, aboutCallback],
    highScores: [highScoresLabel, highScoresCallback],
    login: [loginLabel, loginCallback],
    loggedIn: {
        name,
        isLoggedIn
    }
}) =>
(<DivBox>
    <p>{isLoggedIn ? 
        "Welcome to Everything is Wrong, " + name + "!" 
        : 
        "Welcome to Everything is Wrong!"}</p>
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
        <tr>
            <td>
                <button onClick = {loginCallback}>{loginLabel}</button>
            </td>
        </tr>
    </tbody></table>
</DivBox>)

export default WelcomeComponent
