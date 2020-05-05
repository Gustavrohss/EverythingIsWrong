import React from 'react'
import TopAppBar, {
    TopAppBarIcon,
    TopAppBarRow,
} from '@material/react-top-app-bar'
import menu from './menu.png'

const TopBarComponent = ({
    home: [homeLabel, homeCallback],
    about: [aboutLabel, aboutCallback],
    highScores: [highScoresLabel, highScoresCallback]
}) => {

    const [showAll, setShowAll] = React.useState(false)

    return <TopAppBar>
        <TopAppBarRow>
            <TopAppBarIcon navIcon onClick = {() => setShowAll(!showAll)}>
                <img src = {menu} width = {30} height = {30} />
            </TopAppBarIcon>
            {showAll ?
                (<div>
                    <TopAppBarRow>
                        <u>Using any of these while in game will cause you to leave the game!</u>
                    </TopAppBarRow>
                    <TopAppBarRow>
                        <button onClick = {homeCallback}>
                            {homeLabel}
                        </button>
                        <button onClick = {aboutCallback}>
                            {aboutLabel}
                        </button>
                        <button onClick = {highScoresCallback}>
                            {highScoresLabel}
                        </button>
                    </TopAppBarRow>
                </div>)
                : null}
        </TopAppBarRow>
    </TopAppBar>
}

export default TopBarComponent
//<MaterialIcon hasRipple icon='menu' onClick={() => console.log('click')}/>