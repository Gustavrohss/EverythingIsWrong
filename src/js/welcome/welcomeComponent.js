import React from 'react'

// The welcome screen component
const WelcomeComponent = ({
    host: [hostLabel, hostCallback],
    join: [joinLabel, joinCallback],
    about: [aboutLabel, aboutCallback],
    highScores: [highScoresLabel, highScoresCallback]
}) =>
(<div>
    <p>Welcome to Everything is Wrong!</p>
    <table><tbody>
        <tr>
            <td>
                <button onClick = {joinCallback}>{joinLabel}</button>
            </td>
            <td>
                <button onClick = {hostCallback}>{hostLabel}</button>
            </td>
        </tr>
        <tr>
            <td>
                <button onClick = {highScoresCallback}>{highScoresLabel}</button>
            </td>
            <td>
                <button onClick = {aboutCallback}>{aboutLabel}</button>
            </td>
        </tr>
    </tbody></table>
</div>)

export default WelcomeComponent
