import React from 'react'

const GameRoundComponent = ({
    results: [resultsLabel, resultsCallback],
    next: [nextLable, nextCallback],
    nextDisabled,
    round,          // which round is it?
    answerOptions,  // the answer options (images, correct, etc.)
    question,       // the question to be displayed
    answers,        // the answers from all the other players
    answerCallback, // what should happen when a player clicks on an answer?
    showResults     // should the results for the round be shown?
    /*
        Exact shape/specification of roundInfo TBD
        See default argument for testing example
    */
}) => {

/*
    Images are currently a column, not a row, in the view.
    This might be preferable for mobile use.
    Styling work left as a TODO.

    What works right now should give an idea of how to implement further functionality.
*/
return (<div> // TODO: Maybe not have this check on `round`, but has a prop telling this component what should be displayed
    {round ?
      (<p align = {"center"}>
        <b>Round {round}: </b> {question}
      </p>) :
      round === 0 ?
        (<p align = {"center"}>
          Wait until the host starts the game
        </p>) :
        (<p align = {"center"}>
          You need to join a game in order to play
        </p>)
    }
    <div>
        {answerOptions.map(
            ({image, score, correctAnswer}, index) =>
            <figure key = {index}>
                <img
                    src = {image}
                    width = {"400px"}
                    alt = {"Placeholder"}
                    onClick = {showResults ? ()=> {} :
                      () => answerCallback(index, correctAnswer)}>
                </img>
                {showResults ?
                (<figcaption>
                    {answers[index].map(
                        (player, index2) => correctAnswer ?
                        (<p key = {index2}>
                            <b>{player.name} + 1</b>
                        </p>) :
                        (<p key = {index2}>
                            {player.name}
                        </p>))}
                </figcaption>) : null}
            </figure>
        )}
    </div>
    <button onClick={nextCallback} disabled={nextDisabled}>{nextLable}</button>
    <button onClick={resultsCallback}>{resultsLabel}</button>
</div>)}


export default GameRoundComponent
