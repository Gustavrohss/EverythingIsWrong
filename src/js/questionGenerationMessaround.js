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

export default makePrompt
