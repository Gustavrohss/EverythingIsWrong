import {imgur_client_key, clarifai_client_key} from "./configAPI"

//run in "npm install --save request" & "npm install --save request-promise" in this folder.
//More documentation here: https://github.com/request/request-promise
const functions = require('firebase-functions');
const rp = require('request-promise')   

//Run "npm install clarifai" in this folder
const Clarifai = require('clarifai'); //require the client
const gameRoundGen = require('./gameRoundGen');

//Run "firebase deploy --only functions" in root folder to deploy functions

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
        const subreddit   = IMAGES.FOOD;
        const model       = MODELS.MODEL_MODERATION;
        
        const imgur_client_id = imgur_client_key
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
            apiKey: clarifai_client_key
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
                                modelType: "MODEL_MODERATION",
                                imageType: subreddit,
                                modelOutputs: data,
                                images: images
                            })
                            //return change.after.ref.parent.child("images").set(images); //update the database.
                            return change.after.ref.parent.child("roundInfo").set(roundInfo)
                        }
                        ).catch(error => console.log(error.message));
                })
                .catch(error => console.log(error.message));
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


