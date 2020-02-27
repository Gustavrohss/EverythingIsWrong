import React from 'react'

const WelcomeComponent = ({
    join: [joinLabel, joinCallback], 
    host: [hostLabel, hostCallback],
    highScores: [highScoresLabel, highScoresCallback],
    about: [aboutLabel, aboutCallback]
}) =>
(<div>
    <p>Welcome to Everything is Wrong!</p>
    <table>
        <tbody>
            <tr>
                <td><button onClick = {joinCallback}>
                    {joinLabel}
                </button></td>
                <td><button onClick = {hostCallback}>
                    {hostLabel}
                </button></td>
            </tr>
            <tr>
                <td><button onClick = {highScoresCallback}>
                    {highScoresLabel}
                </button></td>
                <td><button onClick = {aboutCallback}>
                    {aboutLabel}
                </button></td>
            </tr>
        </tbody>
    </table>
</div>)

export default WelcomeComponent