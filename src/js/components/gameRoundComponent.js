import React from 'react'
import {ImageStyle, ImageBoxStyle, ImageWrapper} from '../styledComponents/ImageBox';
import LoaderContainer from '../containers/loaderContainer';

const GameRoundComponent = ({
    nextLable,
    nextCallback,
    nextDisabled,
    round,          // which round is it?
    answerOptions,  // the answer options (images, correct, etc.)
    question,       // the question to be displayed
    answers,        // the answers from all the other players
    answerCallback, // what should happen when a player clicks on an answer?
    showResults,     // should the results for the round be shown?
    canAnswer,
    /*
        Exact shape/specification of roundInfo TBD
        See default argument for testing example
    */
    isLoading,
    roundReason
}) => {

/*
    Images are a row in the view.
    This should be changed to a column for mobile view.
    Styling work left as a TODO.

    What works right now should give an idea of how to implement further functionality.
*/

const [choice, setChoice] = React.useState(null)

return (
    <div className = "flexContainer mainContent">
    {isLoading &&
        (<LoaderContainer />)}
    <div align = "center">

    {round ? // TODO: Maybe not have this check on `round`, but has a prop telling this component what should be displayed
      (<p align = {"center"}>
        <b>Round {round}: </b> {isLoading ? (<b>Loading...</b>) : question}
      </p>) :
      round === 0 ?
        (<p align = {"center"}>
          Wait until the host starts the game
        </p>) :
        (<p align = {"center"}>
          Trying to reconnect...
        </p>)
    }
    {<ImageWrapper>
        {answerOptions.map(
            ({image, correctAnswer}, index) =>
            <div key = {index}><figure>
                <ImageBoxStyle
                    blocked={!canAnswer}
                    reveal={showResults}
                    correct={correctAnswer}
                    selected={!canAnswer && choice === index}
                    onClick = {canAnswer ?
                        () => {setChoice(index); answerCallback(index, correctAnswer)} :
                        () => {}}
                >
                <ImageStyle
                    transparent = {showResults && choice !== index} //If we want to show results
                    src = {image}
                    /*height = {"300px"}*/
                    alt = {"Sorry, we couldn't show the image!"}
                >
                </ImageStyle>
                </ImageBoxStyle>
            </figure>
            {showResults ?
                <div key = {index}>
                <p>{
                correctAnswer && answers[index].length > 1 ?
                "And the winners are..." :
                correctAnswer && answers[index].length === 1 ?
                "And the winner is..." :
                correctAnswer ?
                "This is the correct answer, Everyone is Wrong!" : ""
                }</p>
                {answers[index].map(({name}, plIndex) =>
                <p key = {index + 3 * plIndex}>
                    {name}
                </p>
                )}
                </div>
            :null}
            </div>
        )}
    </ImageWrapper>}

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
    <div>
        <button className = "generalButton" onClick={nextCallback} disabled={nextDisabled}>{nextLable}</button>
    </div>
</div></div>)}


export default GameRoundComponent