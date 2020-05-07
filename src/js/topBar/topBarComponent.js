import React from 'react'
import TopAppBar, {
    TopAppBarRow,
} from '@material/react-top-app-bar'
import StyledButton from '../../stylingComponents/StyledButton'

const TopBarComponent = ({
    home: [homeLabel, homeCallback],
    about: [aboutLabel, aboutCallback],
    highScores: [highScoresLabel, highScoresCallback]
}) => {

    return <TopAppBar>
        <TopAppBarRow>
            <StyledButton color = '#A0CECB' onClick = {homeCallback}>
                {homeLabel}
            </StyledButton>
            <StyledButton color = '#48CFAD' onClick = {aboutCallback}>
                {aboutLabel}
            </StyledButton>
            <StyledButton color = '#A0D468' onClick = {highScoresCallback}>
                {highScoresLabel}
            </StyledButton>
        </TopAppBarRow>
    </TopAppBar>
}

export default TopBarComponent
//<MaterialIcon hasRipple icon='menu' onClick={() => console.log('click')}/>