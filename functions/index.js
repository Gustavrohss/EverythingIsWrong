const functions = require('firebase-functions');
const rp = require('request-promise')   //run in "npm install --save request" & "npm install --save request-promise" in this folder.
                                        //More documentation here: https://github.com/request/request-promise

//Run "firebase deploy --only functions" in root folder to deploy functions



// Functions here are not available in the program necessarily
// They are just written here and the exported to Firebase

// THIS DOES NOT SEEM TO WORK
// Example of how realtime database can be used
// Adds a second, more hardcore player and score whenever a score is added
exports.BIGSCORE = functions.database.ref("/highscores/")
    .onCreate(snapshot => {
        const val = snapshot.val()
        return snapshot
            .ref
            .parent
            .push()
            .set({ name: val.name.toUpperCase(), score: val.score + 1000 })
    })


//=================================
//When a new game round starts, "when game-round changes", make a call to imgur API and choose.abs
//This would've worked if we pay-to-win
//https://firebase.google.com/docs/functions/database-events#handle_event_data
exports.UPDATE_IMAGES = functions.database.ref('/lobbies/{lobbyID}/gameInfo/')
    .onUpdate((change, context) => {
        //TODO: add images to this lobby.
        // Only edit data AFTER it is created
        if (!change.before.exists()) {
            return null;
        }

        //Test variables only
        //const subreddit = 'FoodPorn'

        /*HARDCODED. TODO: CHANGE TO MORE DYNAMIC */
        const IMAGES = {
                    FOOD:       'FoodPorn',
                    BEARS:      'bears',
                    CARS:       'carporn'
        };
        const MODELS = {
                MODERATION:     'MODEL_MODERATION',
                FOOD:           'MODEL_FOOD'
        };
        
        //Randomly select one:
        const subreddit   = IMAGES.FOOD;
        const model       = MODELS.MODERATION;
        
        
        const imgur_client_id = 'Client-ID 5ca180817daefb2'
        const extension = 'gallery/r/' + subreddit + '/top/all' ;   //change to get it from game-settings
        const num_images = 3;           // -||-
        //const lobbyID = context.params.lobbyID;

        var requestOptions = {
            uri: 'https://api.imgur.com/3/' + extension,
            method: 'GET',
            headers: {'Authorization': imgur_client_id},
            //body: formdata,
            redirect: 'follow',
            json: true // Automatically parses the JSON string in the response
        };

       testFunction(context.params.lobbyID);
        
        return rp(requestOptions)
                .then(result => result.data)
                .then(data => {
                    var images = {}
                    for (let i = 0; i < num_images; i++) {
                        //console.log(data[Math.floor(Math.random() * data.length)])
                        images[i] = data[Math.floor(Math.random() * data.length)].link
                    }

                    //Call to clarifai
                    return clarifai_app



                    //Call to generate prompts and scores


                    return change.after.ref.parent.child("images").set(images) //update the database.
                    //console.log(data)
                });
        
    });

    /*
function compute_image_value(images, model=Clarifai.GENERAL_MODEL){

    //Return a promise containing the scores.
    return clarifai_app.models.predict(model, images)
        .then(response => response['outputs'])
        .then(result => {
        
        })
        .catch(error => console.log(error.message));
    //return scores;
}
*/


function testFunction(lobbyID){
    console.log(lobbyID + " has had their round changed!");
}


exports.CLEANUP = functions.database.ref("/lobbies/{lobbyID}/players")
    .onDelete((snapshot, context) => {
        if (Object.keys(context.params).length < 1) {
            return snapshot.ref.parent.parent.remove()
        } 
    })

//=================================

// THIS DOES NOT WORK EITHER
// Tried several workarounds
// No success
/*
exports.redditRequest = functions.https.onCall(async data => {
    const imgur_client_id = "Client ID 5ca180817daefb2"
    const myHeaders = new Headers();
    myHeaders.append("Authorization", imgur_client_id);
    const ftch = await fetch(
        `https://api.imgur.com/3/gallery/r/${data.text}/top/all`,
        {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
    )
    const out = await ftch.json()
    return out
})
*/
