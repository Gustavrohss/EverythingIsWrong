import Clarifai from 'clarifai'

// Example usage of moderation model
// Looks for drugs, nudity, gore, etc
// All the fun stuff
export const testModeration = function() {

    // Your key goes here (or in a config file, prefereably)
    // (It's OK, I won't tell)
    const clar = new Clarifai.App({
        apiKey: "KEY"
    })

    // Images to use
    // Most of these are very safe, but there's drugs in there
    // Not that the literal heroin is like 20% unsafe
    const images = [
        //"http://images.media-allrecipes.com/userphotos/960x960/3756023.jpg",
        //"http://1.bp.blogspot.com/-sm2PC8KW-l4/UDP7Z4Mz80I/AAAAAAAAB6g/j91oeuESMcs/s1600/apple.jpg",
        //"https://2rt9loawzcmbvlze40mhj9n0-wpengine.netdna-ssl.com/wp-content/uploads/2015/04/pomegranate-760x428.jpg",
        //"https://www.couponclippingcook.com/wp-content/uploads/2012/07/3-cut-zucchini.jpg",
        //"https://images-gmi-pmc.edge-generalmills.com/ade63c89-842e-4f84-bc2f-171610838ed7.jpg",
        //"https://cdn.abclocal.go.com/content/wtvd/images/cms/automation/images/1157307_1280x720.jpg",
        //"https://d.newsweek.com/en/full/695875/weed-genome-medicine-tumor-cancer.jpg",
        //"https://i.pinimg.com/736x/10/95/9e/10959e988e46284256de8fa33fa138df--hipster-wallpaper-iphone-wallpaper.jpg"
    ]

    // Reduce amount of images to reduce amount of API calls
    images.forEach(image => {
        // Create the model; note that .then is called on the model
        clar.models.initModel({id: Clarifai.MODERATION_MODEL})
        .then(model => {
            // Self-explanatory
            return model.predict(image)
        })
        .then(response => {
            // https://www.clarifai.com/models/moderation-image-recognition-model-d16f390eb32cad478c7ae150069bd2c6
            return response["outputs"][0]["data"]["concepts"]
        })
        .then(conceptsArr => {
            // Instead of array of objects containing "name" and "value", 
            //  just make it "name": "value" in one parent object
            let out = {}
            conceptsArr.forEach(concept => {
                out[concept["name"]] = concept["value"]
            })
            return out
        })
        .then(concepts => {
            // The concepts
            console.log(concepts)
            // Scaling factor for "unsafety"
            const safe = 1 - concepts["safe"]
            // Sum up all the fun parts
            const unsafeSum = Object.keys(
                Object.assign(concepts, {"safe": 0})
            ).reduce((acc, val) => acc + concepts[val], 0)
            // Multiply by safety factor
            console.log(safe * unsafeSum)
            // An example of how to generate a "bad"-measure; which the correct answer is based on
        })
    })
}

// Test the celebrity model
// Read above, same deal
export const testCelebrity = function() {
    const clar = new Clarifai.App({
        apiKey: "KEY"
    })
    const images = [
        "http://images.media-allrecipes.com/userphotos/960x960/3756023.jpg",
        // "http://1.bp.blogspot.com/-sm2PC8KW-l4/UDP7Z4Mz80I/AAAAAAAAB6g/j91oeuESMcs/s1600/apple.jpg",
        // "https://2rt9loawzcmbvlze40mhj9n0-wpengine.netdna-ssl.com/wp-content/uploads/2015/04/pomegranate-760x428.jpg",
        // "https://thebeautyandstyles.files.wordpress.com/2015/07/miley-cyrus-281.jpg?w=768"
    ]
    images.forEach(image => {
        clar.models.initModel({id: Clarifai.CELEBRITY_MODEL})
        .then(model => {
            return model.predict(image)
        })
        .then(response => {
            // https://www.clarifai.com/models/celebrity-image-recognition-model-e466caa0619f444ab97497640cefc4dc#documentation
            // PROBLEM:
            //  Celebrity model is not usable.
            //  When it detects nothing, it doesn't return "Kanye West": 0.00000001
            //  It returns nothing
            //  Not null, undefined, 0, an empty array, an empty object, nothing
            //  The "regions" field is missing
            //  We will have to avoid this model entirely; leaving it here for documentation and example usage
            console.log(response)
            console.log(response["outputs"][0]["data"]["regions"][0]["data"]["concepts"])
        })
    })
}