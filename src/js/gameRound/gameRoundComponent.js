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
    loggedIn: [isLoggedIn, username]

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
    <table><tbody><tr>
        {answerOptions.map(
            ({image, correctAnswer}, index) =>
            <td key = {index}><figure>
                <img
                    src = {image}
                    height = {"300px"}
                    alt = {"Placeholder"}
                    onClick = {showResults ? () => {} :
                    () => answerCallback(index, correctAnswer)}>
                </img> 
                {showResults ? 
                <div>
                    <p>{
                    correctAnswer && answers[index].length > 1 ? 
                    "And the winners are..." :
                    correctAnswer && answers[index].length === 1 ?
                    "And the winner is..." :
                    correctAnswer ?
                    "This is the correct answer, Everyone is Wrong!" : ""
                    }</p>
                    {answers[index].map(({name}, index2) => 
                        <p key = {index + 3 * index2}>
                            {name}
                        </p>
                    )}
                </div>
                : null}
            </figure></td>
        )}
    </tr></tbody></table>
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
            
    <StyledButton color = 'orchid' onClick={nextCallback} disabled={nextDisabled}>{nextLable}</StyledButton>
    <StyledButton color = 'orchid' onClick={() => resultsCallback(isLoggedIn)}>{resultsLabel}</StyledButton>
</div>)}


export default GameRoundComponent
