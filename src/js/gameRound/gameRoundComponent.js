import React from 'react'
import StyledButton from '../../stylingComponents/StyledButton'
import LoaderContainer from '../loader/loaderContainer';

const GameRoundComponent = ({
    results: [resultsLabel, resultsCallback],
    next: [nextLable, nextCallback],
    nextDisabled,
    round,          // which round is it?
    answerOptions,  // the answer options (images, correct, etc.)
    question,       // the question to be displayed
    answers,        // the answers from all the other players
    answerCallback, // what should happen when a player clicks on an answer?
    showResults,     // should the results for the round be shown?
    /*
        Exact shape/specification of roundInfo TBD
        See default argument for testing example
    */
    isLoading,
    roundReason,
    loggedIn

}) => {

/*
    Images are a row in the view.
    This should be changed to a column for mobile view.
    Styling work left as a TODO.

    What works right now should give an idea of how to implement further functionality.
*/

return (<div align = "center">
    {round ? // TODO: Maybe not have this check on `round`, but has a prop telling this component what should be displayed
      (<p align = {"center"}>
        <b>Round {round}: </b> {isLoading ? (<b>Loading place holder...</b>) : question}
      </p>) :
      round === 0 ?
        (<p align = {"center"}>
          Wait until the host starts the game
        </p>) :
        (<p align = {"center"}>
          You need to join a game in order to play
        </p>)
    }
    {isLoading ? 
        (<LoaderContainer />) 
    : (    
    <table><tbody>
        <tr>
            {answerOptions.map(
                ({image, correctAnswer}, index) =>
                <td key = {index}><figure>
                    <img
                        src = {image}
                        height = {"300px"}
                        alt = {"Sorry, we couldn't show the image!"}
                        onClick = {showResults ? () => {} :
                        () => answerCallback(index, correctAnswer)}>
                    </img>
                </figure></td>
            )}
        </tr>
        {showResults ? 
        <tr>
            {answerOptions.map(
                ({correctAnswer}, imIndex) =>
                <td key = {imIndex}>
                    <p>{
                    correctAnswer && answers[imIndex].length > 1 ? 
                    "And the winners are..." :
                    correctAnswer && answers[imIndex].length === 1 ?
                    "And the winner is..." :
                    correctAnswer ?
                    "This is the correct answer, Everyone is Wrong!" : ""
                    }</p>
                    {answers[imIndex].map(({name}, plIndex) => 
                    <p key = {imIndex + 3 * plIndex}>
                        {name}
                    </p>
                    )}
                </td>
            )}
        </tr>
        : null}
    </tbody></table>
    )}

    {showResults ? 
        <div>
            <i>Why is that the correct answer?</i> {roundReason}
            {answers.map((list, index1) => 
            list.map(({name, score}, index2) => 
                <p key = {index1 + 3 * index2}><b>{name}</b> has <b>{score}</b> points</p>
            ))}
        </div>
        : 
    null}
    <div align = 'center'>
        <StyledButton color = 'orchid' onClick={nextCallback} disabled={nextDisabled}>{nextLable}</StyledButton>
        <StyledButton color = 'orchid' onClick={() => resultsCallback(loggedIn)}>{resultsLabel}</StyledButton>
    </div>
</div>)}


export default GameRoundComponent
