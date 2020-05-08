import React from 'react'

// The welcome screen component
const WelcomeComponent = ({
    host: [hostLabel, hostCallback],
    join: [joinLabel, joinCallback],
    login: [loginLabel, loginCallback],
    loggedIn,
    name
}) =>
(<div className = "flexContainer mainContent">
    <p>{loggedIn ? 
        "Welcome to Everything is Wrong, " + name + "!" 
        : 
        "Welcome to Everything is Wrong!"}
    </p>
    <button className = "generalButton"
        onClick = {joinCallback}>
        {joinLabel}
    </button>
    <button className = "generalButton"
        onClick = {hostCallback}>
        {hostLabel}
    </button>
    <button className = "generalButton"
        onClick = {loginCallback}>
        {loginLabel}
    </button>
</div>)

export default WelcomeComponent
