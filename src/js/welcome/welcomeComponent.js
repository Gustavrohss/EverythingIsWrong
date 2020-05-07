import React from 'react'
import StyledButton from '../../stylingComponents/StyledButton'
import DivBox from '../../stylingComponents/DivBox.js'
// The welcome screen component
const WelcomeComponent = ({
    host: [hostLabel, hostCallback],
    join: [joinLabel, joinCallback],
    login: [loginLabel, loginCallback],
    loggedIn,
    name
}) =>
(<DivBox column = {true}>
    <p align = 'center'>{loggedIn ? 
        "Welcome to Everything is Wrong, " + name + "!" 
        : 
        "Welcome to Everything is Wrong!"}
    </p>
    <StyledButton 
        color = '#E8334A' 
        onClick = {joinCallback}>
        {joinLabel}
    </StyledButton>
    <StyledButton 
        color = '#FC6E51' 
        onClick = {hostCallback}>
        {hostLabel}
    </StyledButton>
    <StyledButton 
        color = '#ED8585' 
        onClick = {loginCallback}>
        {loginLabel}
    </StyledButton>
</DivBox>)

export default WelcomeComponent
