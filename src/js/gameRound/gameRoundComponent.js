import React from 'react'

const GameRoundComponent = ({
    results: [resultsLabel, resultsCallback],
    roundInfo = {
        promptString: "Which of these locations is secretly a pie?",
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
        ],
        answers: [  // null before the answers start coming in
            ["Alice", "Bob"],
            ["Carla", "Duncan", "Erika"],
            ["Fandango"]
        ]
    }
    /*
        Exact shape/specification of roundInfo TBD
        See default argument for testing example
    */
}) => {

// State hook
// https://reactjs.org/docs/hooks-state.html
const [showResults, setShowResults] = React.useState(false)
/*

    Images are a column, not a row, currently.
    This might be preferable for mobile use.
    Design work left as a TODO.

    What works right now should give an idea of how to implement further functionality.

*/
return (<div>
    <p align = {"center"}>{roundInfo.promptString}</p>
    <div>
        {roundInfo.options.map(
            ([image, value, correct], index) => 
            <figure key = {index}>
                <img 
                    src = {image}
                    width = {"400px"} 
                    height = {"200px"}
                    alt = {"Placeholder"}
                    onClick = {() => setShowResults(true) /* Will likely be some sort of listener for database, passed with roundInfo */}>
                </img> 
                {showResults ? 
                (<figcaption>
                    {value}
                    {roundInfo.answers[index].map(
                        (player, index2) => correct ?
                        (<p key = {index2}>
                            <b>{player} + 1</b>
                        </p>) :
                        (<p key = {index2}>
                            {player}
                        </p>))}
                </figcaption>) : null}
            </figure>
        )}
    </div>
    <button onClick={resultsCallback}>{resultsLabel}</button>
</div>)}

export default GameRoundComponent
