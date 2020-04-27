//run in "npm install --save request" & "npm install --save request-promise" in this folder.
//More documentation here: https://github.com/request/request-promise
const functions = require('firebase-functions');
const rp = require('request-promise')   

//Run "npm install clarifai" in this folder
const Clarifai = require('clarifai'); //require the client
const gameRoundGen = require('./gameRoundGen');

//Run "firebase deploy --only functions" in the root functions folder to deploy functions

// Functions here are not available in the program necessarily
// They are just written here and the exported to Firebase

//=================================
//When a new game round starts, "when game-round changes", make a call to imgur API and choose.abs
//This would've worked if we pay-to-win
//https://firebase.google.com/docs/functions/database-events#handle_event_data
exports.UPDATE_IMAGES = functions.database.ref('/lobbies/{lobbyID}/gameInfo/round')
.onUpdate((change, context) => {
    //TODO: add images to this lobby.
    // Only edit data AFTER it is created
    if (!change.before.exists()) {
        return null;
    }

    //Test variables only
    //const subreddit = 'FoodPorn'

    /* HARDCODED. TODO: CHANGE TO MORE DYNAMIC */
    const IMAGES = {
                FOOD:       'FoodPorn',
                BEARS:      'bears',
                CARS:       'carporn'
    };
    const MODELS = {
            "MODEL_MODERATION":     Clarifai.MODERATION_MODEL,
            "MODEL_FOOD":           Clarifai.FOOD_MODEL
    };
    
    // Randomly select one:
    // TODO
    const choice = arr => arr[Math.floor(Math.random() * arr.length)]
    const subreddit = IMAGES[choice(Object.keys(IMAGES))]
    const model = MODELS[subreddit === IMAGES.FOOD ? 
        choice(Object.keys(MODELS).filter(key => key !== "MODEL_FOOD")):choice(Object.keys(MODELS))
    ]
    
    const imgur_client_id = functions.config().imgur.id
    const extension = 'gallery/r/' + subreddit + '/top/all' ;   //change to get it from game-settings
    const num_images = 3;           // -||-

    var requestOptions = {
        uri: 'https://api.imgur.com/3/' + extension,
        method: 'GET',
        headers: {'Authorization': imgur_client_id},
        redirect: 'follow',
        json: true // Automatically parses the JSON string in the response
    };

    //Clarifai app
    const clarifai_app = new Clarifai.App({
        apiKey: functions.config().clarifai.key
    });

    return rp(requestOptions)
            .then(result => result.data.filter(d => d.type === "image/jpeg")) //filter out images
            .then(data => {
                var images = [] //array for clarifai app
                for (let i = 0; i < num_images; i++) {
                    images[i] = data[Math.floor(Math.random() * data.length)].link
                }
                //Call to clarifai
                return clarifai_app.models.predict(model, images)
                    .then(response => response)
                    .then(result => {
                        const data = result.outputs;

                        //Call to generate prompts and scores
                        roundInfo = gameRoundGen.generatePromptAndScores({
                            modelType: model,
                            imageType: subreddit,
                            modelOutputs: data,
                            images: images
                        })
                        //return change.after.ref.parent.child("images").set(images); //update the database.
                        return change.after.ref.parent.child("roundInfo").set(roundInfo)
                    }
                    ).catch(error => console.log(error.message)); //Probably return some error
            })
            .catch(error => console.log(error.message)); //Return some error
});


//Cleanup. Delete a lobby if it has no players left.
exports.CLEANUP = functions.database.ref("/lobbies/{lobbyID}/players/")
.onDelete(snapshot => {
    //console.log(snapshot.ref.parent.toJSON());
    //console.log(snapshot.ref.parent.parent.toJSON());
    if (Object.keys(snapshot.val).length < 1) {
        return snapshot.ref.parent.remove();
    } else{
        return null;
    }
})


//When creating a lobby, add a timestamp to it:
exports.ADD_TIMESTAMP = functions.database.ref("/lobbies/{lobbyID}")
.onCreate((snapshot, context) => {
    var ref = snapshot.ref.parent; //ref to "/lobbies/"
    var date_now = Date.now();

    var cutoff_date = date_now - 2 * 60 * 60 * 1000; //our cutoff is anything newer than two hours. idk
    var toUpdate = ref.orderByChild('timestamp').endAt(cutoff_date); //Keep everything older than two hours.
    var updates = {}; //Contains all the updates
    updates[context.params.lobbyID + "/timestamp"] = date_now; //timestamp on the newly created lobby with current date
        
    return toUpdate.once('value', function(snapshot_toUpdate){
        snapshot_toUpdate.forEach(function(child) { //Go through every element to be deleted.
            if(child.key !== context.params.lobbyID){
                updates[child.key] = null
            }
        });
        return ref.update(updates);
    });

})
