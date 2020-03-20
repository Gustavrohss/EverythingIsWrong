import React from 'react'

const GameRoundComponent = ({
    results: [resultsLabel, resultsCallback],
    gameInfo,
    answers,
    answerCallback
    /*
        Exact shape/specification of roundInfo TBD
        See default argument for testing example
    */
}) => {

// DEBUGGING PLACEHOLDER
if (true) gameInfo = {
    modelType: "Food",
    imageType: "Celebrity",
    options: [
        [
            "https://i.ytimg.com/vi/Tdac7EAyL80/maxresdefault.jpg",
            0.3, false
        ],
        [
            "https://i.ytimg.com/vi/WRsPwaDT8Ao/maxresdefault.jpg",
            0.4, false
        ],
        [
            "https://i.ytimg.com/vi/UobKColhhtU/maxresdefault.jpg",
            0.7, true
        ]
    ]
}
// END


// State hook
// Placeholder
// This will be based on whether or not, some variation of:
// -- All players have answered
// -- Some single field is set (which, in turn, is set when all players have answered)
// https://reactjs.org/docs/hooks-state.html
const [showResults, setShowResults] = React.useState(false)


/*
    Images are currently a column, not a row, in the view.
    This might be preferable for mobile use.
    Styling work left as a TODO.

    What works right now should give an idea of how to implement further functionality.
*/
return (<div>
    <p align = {"center"}>
    <b>Round {gameInfo.round}: </b>
        {makePrompt(gameInfo.imageType, gameInfo.modelType)}
    </p>
    <div>
        {gameInfo.options.map(
            ([image, value, correct], index) =>
            <figure key = {index}>
                <img
                    src = {image}
                    width = {"400px"}
                    height = {"200px"}
                    alt = {"Placeholder"}
                    onClick = {showResults ? ()=> {} : () => {
                      setShowResults(true);
                      answerCallback(index, correct)
                    } /* Will likely be some sort of listener for database, passed with roundInfo */}>
                </img>
                {showResults ?
                (<figcaption>
                    {value}
                    {answers[index].map(
                        (player, index2) => correct ?
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
    <button onClick={resultsCallback}>{resultsLabel}</button>
</div>)}

// Prototype.
// The switch cases might be imported constants.
const makePrompt = function(imageType, modelType) {

    let promptString = "What "
    const rand = (array) => {
        const idx = Math.floor(Math.random() * array.length)
        return array[idx]
    }

    let options = null
    switch (imageType) {
        case "Food":
            options = [
                "dish",
                "meal",
                "snack",
                "healthy source of nutrition"
            ]
            break
        case "Dog":
            options = [
                "furry lil' bastard",
                "bundle of joy",
                "friend",
                "doge" /* Dead meme, I know */
            ]
            break
        case "Celebrity":
            options = [
                "celebrity",
                "famous person",
                "cool kid",
                "member of the bourgeoise"
            ]
            break
        default:
            // This should never ever happen
            options = []
    }

    // Could take the image type as a parameter for further customization
    promptString += rand(options) + " "
    promptString += rand([
        "is secretly a",
        "is, as a matter of fact, a",
        "has a secret identity as a",
        "doesn't look the part, but is a",
        "upon closer inspection hides a"
    ])
    promptString += " "

    // Could take input from the model output.
    // Example: image of coffee matches John Cena 90%,
    //  Bring "top matching celebrity" (John) as input
    switch (modelType) {
        case "Celebrity":
            options = [
                "celebrity",
                "showstopper",
                "member of The Illuminati"
            ]
            break
        case "Food":
            options = [
                "potential dinner",
                "reason to ignore that diet",
                "snacc"
            ]
            break
        case "Moderation":
            options = [
                "terrible, terrible influence on today's youth",
                "deliciously depraved good time",
                "reason to leave the party",
                "bad topic of conversation at your local place of worship"
            ]
            break
        default:
            options = [
                "reason to yell at the developers for making a faulty app"
            ]
            break
    }

    promptString += rand(options)
    promptString += "?"

    return promptString

}

export default GameRoundComponent
