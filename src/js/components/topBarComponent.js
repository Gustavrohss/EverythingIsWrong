import React from 'react'

const TopBarComponent = ({
    home: [homeLabel, homeCallback],
    about: [aboutLabel, aboutCallback],
    highScores: [highScoresLabel, highScoresCallback],
    loggedIn
}) => {

    return <div className = "flexContainer">
        <div style = {{flexDirection: "row"}}>
            <button className = "topBarButton" onClick = {homeCallback}>
                {homeLabel}
            </button>
            <button className = "topBarButton" onClick = {aboutCallback}>
                {aboutLabel}
            </button>
            <button className = "topBarButton" onClick = {highScoresCallback}>
                {highScoresLabel}
            </button>
        </div>
    </div>
}

export default TopBarComponent