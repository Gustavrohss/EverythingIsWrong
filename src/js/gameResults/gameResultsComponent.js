import React from 'react'
import StyledButton from '../../stylingComponents/StyledButton'

// Game results component
const GameResultsComponent = ({
    home: [homeLabel, homeCallback],
    scores
}) =>
// TODO
// Show the winner in a more stylish way than "top of list"
// Winners deserve the clout
(<div>
    {/* Makes sure scores exists, is not null or undefined, and has elements in it */}
    {(scores && scores.length > 0) ?
      <p>The winner is <b>{scores[0].name}</b>!</p> :
      <p> Placeholder </p>}
    <ol>
        {scores
            .map(player => <p key = {player.playerID}> {player.name}: <b>{player.score}</b></p>)
        }
    </ol>
    <StyledButton color = 'lightblue' onClick={homeCallback}>Go back to start page</StyledButton>
</div>)

export default GameResultsComponent
