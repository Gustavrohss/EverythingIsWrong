import {fbDatabase} from "./firebaseConfig"
import {imgur_client_key, clarifai_client_key} from "./configAPI"

/**
 * Here we have functions to read and write from the Realtime Database
 * Basic guide for read/write operations: https://firebase.google.com/docs/database/web/read-and-write
 * Docs: https://firebase.google.com/docs/reference/js/firebase.database
 *
 * The structure of the database is:
 * lobbies: {
 *   <lobbyID>: {
 *     gameInfo: {
 *       round: (int),
 *       roundInfo: {
 *          promptString: (str), // the question
 *          outputs: [ // one object per answer option
 *            {concepts, correctAnswer, image, score}
 *          ]
 *        }
 *     },
 *     players: {
 *       <playerID>: {
 *         score: (int),
 *         name: (str),
 *         status: LOBBY/FETCHING/READY/ANSWERING
 *         answerOption: -1-2 (0-2 = answered picture 0,1 or 2, -1= not answered )
 *       },
 *       settings: {
 *         gameType: (int),
 *         questions: (int) // number of questions in the game
 *       }
 *     },
 *     settings: {
 *       gameType: (int),
 *       questions: (int) // number of questions in the game
 *     }
 *   }
 *}
 */


 // Create an initial player object with a specific username
 const getInitialPlayerObject = (name) => ({name, score: 0, status: "READY", answerOption: -1})

/**
 * Create a lobby in the database
 * @param {str} hostName - the chosen alias for the host
 * @param {Object} settings - a setting-object with the settings of the game
 *
 * @return {Object} Returns the new lobby and the player ID of the host as an
 *          object with a `playerID` and a `lobby` element.
 */
export function createLobby(hostName, settings) {
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let lobbyID = ""
    for (let i = 0; i < 4; i++) { lobbyID += CHARS.charAt(Math.floor(Math.random() * CHARS.length)) }
    const lobby = {
        lobbyID: lobbyID,
        settings: settings,
        gameInfo: {
            round: 0
        },
        players: {
            host: getInitialPlayerObject(hostName)
        }
    }
    return fbDatabase.ref("/lobbies/" + lobbyID).set(lobby).then(() => ({playerID: "host", lobby}));
}

/**
 * Join an existing lobby.
 * @param {str} lobbyCode - the ID of the lobby that should be joined
 * @param {str} user - the chosen alias for the player that will join the lobby
 *
 * @return {Promise} Returns a promise which returns the new lobby and the
 *          player ID of the user as an object on the form {playerID, lobby}.
 *          If the lobby doesn't exist (or a game session is already running
 *          in the lobby),the returned promise will fail.
 */
export function joinLobby(lobbyCode, user) {
    const ref = fbDatabase.ref("/lobbies/" + lobbyCode)

    return ref.once("value").then(snapshot => {
        if(snapshot.exists()) { //Check if lobby exists
            let pushReturn = fbDatabase.ref("/lobbies/" + lobbyCode + "/players")
                .push(getInitialPlayerObject(user)); //push new player

            // TODO: check that the players in the lobby haven't started playing yet.
            return pushReturn.then(() => {
              return ref.once("value").then(snapshot => {
                //console.log("pID: " + pushReturn.key + ", snapshot:")
                //console.log(snapshot.val())
                return {playerID: pushReturn.key, lobby: snapshot.val()}
              })
            }); //Success!
        } else {
            //console.log("Lobby " + lobbyCode + " does not exist!");
            throw new Error("Lobby " + lobbyCode + " does not exist!"); //Failure!
        }
    })
}

/**
 * Start subscribing to changes in a specific lobby.
 * @param {str} lobbyCode - the ID of the lobby
 * @param {({gameInfo: Object}) => any} gameInfoCallback - A function handling
 *    updates to the gameInfo value in the lobby. Gets the new gameInfo-value.
 * @param {({player: Object, playerID: str}) => any} addPlayerCallback - A function
 *    handling new players that has joined the lobby.
 * @param {({player: Object, playerID: str}) => any} changePlayerCallback - A function
 *    handling changes to a specific player. Gets the new player value.
 * @param {({playerID: str}) => any} removePlayerCallback - A function handling
 *    deletion of a specific player in the lobby.
 *
 * @return {() => undefined} Returns a function which will unsubscribe to the lobby.
 */
export function setListener(
  lobbyCode,
  gameInfoCallback,
  addPlayerCallback,
  changePlayerCallback,
  removePlayerCallback
){
    const players = fbDatabase.ref("/lobbies/" + lobbyCode +"/players/")
    const listeners = {
      gameInfoListener: fbDatabase.ref("/lobbies/" + lobbyCode + "/gameInfo/")
        .on("value", snapshot => {
            console.log("Rewritten gameinfo in lobby " + lobbyCode)
            gameInfoCallback({gameInfo: snapshot.val()})
        }),

      playerChangedListener: players.on("child_changed",
        (childSnapshot, prevChildKey) => {
            console.log("Player " + childSnapshot.key + " changed in lobby " + lobbyCode)
            changePlayerCallback({
              player: childSnapshot.val(),
              playerID: childSnapshot.key
            }) // childSnapshot.val() <--- {name: "childName", score: (int)}
        }),

      // This will currently be invoced for all initial children and afterwards for all new
      // TODO: playerCallback should only be called when a new child is added.
      playerAddedListener: players.on("child_added",
        (childSnapshot, prevChildKey) => {
            console.log("Player " + childSnapshot.key + " added in lobby " + lobbyCode)
            addPlayerCallback({
              player: childSnapshot.val(),
              playerID: childSnapshot.key
            }) // childSnapshot.val() <--- {name: "childName", score: (int)}
        }),

      playerRemovedListener: players.on("child_removed",
        oldChildSnapshot => {
            console.log("Player " + oldChildSnapshot.key + " removed from lobby " + lobbyCode)
            removePlayerCallback({playerID: oldChildSnapshot.key})
        })
    }

    return () => stopListener(lobbyCode, listeners)
}

/**
 * Turn off listeners connected to a specific lobbby.
 * @param {str} lobbyCode - the ID of the lobby
 * @param gameInfoListener - a callback that can be passed to `ref.off()`
 *    to turn off the listener on gameInfo-changes
 * @param playerChangedListener - a callback that can be passed to `ref.off()`
 *    to turn off the listener on player updates
 * @param playerAddedListener - a callback that can be passed to `ref.off()`
 *    to turn off the listeners on added players
 * @param playerRemovedListener - a callback that can be passed to `ref.off()`
 *    to turn off the listeners on player removals
 */
export function stopListener(lobbyCode, {
    gameInfoListener,
    playerChangedListener,
    playerAddedListener,
    playerRemovedListener
  }) {
    console.log("Remove listeners in lobby " + lobbyCode)
    fbDatabase.ref("/lobbies/" + lobbyCode + "/gameInfo/").off("value", gameInfoListener)
    const players = fbDatabase.ref("/lobbies/" + lobbyCode +"/players/")
    players.off("child_changed", playerChangedListener)
    players.off("child_added", playerAddedListener)
    players.off("child_removed", playerRemovedListener)
}

/**
 * Updates the score of a specific player in a specific lobby.
 * @param {str} lobbyCode - the ID of the lobby
 * @param {str} playerID - the ID of the player
 * @param {number} newScore - the new score of the player
 *
 * @return {Promise} Returns a promise that will fail if the player or
 *    lobby does not exist.
 */
export function updateScore(lobbyCode, playerID, newScore){
    const playerPath = `lobbies/${lobbyCode}/players/${playerID}`
    return fbDatabase.ref(playerPath).once("value").then(snapshot => {
      if (snapshot.exists()) { // check if player exists
        return fbDatabase.ref(playerPath + "/score").set(newScore)
      } else {
        throw new Error(`Player ${playerID} does not exist in ${lobbyCode}!`); //Failure!
      }
    })
}

/**
 * Update the status of a player in a specific lobby. The status must be one
 * of "LOBBY", "READY", "FETCHING" or "ANSWERING".
 * @param {str} lobbyCode - the ID of the lobby
 * @param {str} playerID - the ID of the player
 * @param {str} newStatus - the new staus
 *
 * @return {Promise} Returns a promise that will fail if the player or
 *    lobby does not exist, or if the status is not a valid status.
 */
export function updateStatus(lobbyCode, playerID, newStatus) {
    const statuses = ["LOBBY", "READY", "FETCHING", "ANSWERING"]
    const playerPath = `lobbies/${lobbyCode}/players/${playerID}`
    return statuses.includes(newStatus) ?
      fbDatabase.ref(playerPath).once("value").then(snapshot => {
        if (snapshot.exists()) { // check if player exists
          return fbDatabase.ref(playerPath + "/status").set(newStatus)
        } else {
          throw new Error(`Player ${playerID} does not exist in ${lobbyCode}!`); //Failure!
        }
      }) :
      Promise.reject(new Error("Invalid status")) // Returns a failing promise
}

/**
 * Register an answer from a player. The status of the player will be set to
 * "READY" and the new scores and status will be uploaded to the database.
 * @param {str} lobbyCode - the ID of the lobby
 * @param {str} playerID - the ID of the player
 * @param {number} answerOption - a number indicating the chosen answer
 *                -1 means nothing chosen (timelimit exeded)
 *                 0,1 or 2 means corresponding answer.
 * @param {number} newScore - the new score of the player
 *
 * @return {Promise} Returns a promise that will fail if the player or
 *    lobby does not exist, or if the answer option is invalid.
 */
export function answerQuestion(lobbyCode, playerID, answerOption, newScore) {
  const playerPath = `lobbies/${lobbyCode}/players/${playerID}`
  return answerOption >= -1 && answerOption < 3 ?
    fbDatabase.ref(playerPath).once("value").then(snapshot => {
      if (snapshot.exists()) { // check if player exists
        return fbDatabase.ref(playerPath)
          .update({
            status: "READY",
            score: newScore,
            answerOption
          })
      } else {
        throw new Error(`Player ${playerID} does not exist in ${lobbyCode}!`) //Failure!
      }
    }) :
    Promise.reject(new Error("Invalid answer option"))
}

/**
 * Makes all players ready for the next question. Increments the round count
 * and sets the status of all players to "ANSWERING"
 * @param {str} lobbyCode - the ID of the lobby
 * @param {Object} roundInfo - the roundInfo for the next round (including
 *    questions and answer options)
 *
 * @return {Promise} Returns a promise that will fail if the lobby does
 *    not exist, or if lobby has no gameInfo.
 */
export function nextQuestion(lobbyCode) {
  // TODO: Roundinfo should be created by cloud functions
  return fbDatabase.ref(`lobbies/${lobbyCode}/gameInfo/round`).once("value")
    .then(snapshot => {
      if (snapshot.exists()) { // check if lobby exists
        const nextRound = snapshot.val() + 1
        fbDatabase.ref(`lobbies/${lobbyCode}/gameInfo`)
          .update({round: nextRound})
          .then(
            fbDatabase.ref(`lobbies/${lobbyCode}/players`).once("value").then(snapshot => {
              let allUpdates = {}
              snapshot.forEach((childSnapshot) => {
                allUpdates[`${childSnapshot.key}/status`] = "ANSWERING"
              })
              return fbDatabase.ref(`lobbies/${lobbyCode}/players`)
                .update(allUpdates)
            })
          )
      } else {
        throw new Error(`Lobby ${lobbyCode} does not exist, or has no gameInfo!`) //Failure!
      }
  })
}

/**
 * Delete a specific player in a specific lobby.
 * NOTE: make sure to unsubscribe listeners before removal
 * @param {str} lobbyCode - the ID of the lobby
 * @param {str} playerID - the ID of the player
 *
 * @return {Promise}
 */
export function deletePlayer(lobbyCode, playerID){
    return fbDatabase.ref(`lobbies/${lobbyCode}/players/${playerID}`).remove()
        // TODO: remove these console.logs... The client should handle failure instead
        // Should maybe check if lobby and player exist
        .then(() => console.log(`Successfully removed player ${playerID} from ${lobbyCode}`))
        .catch(error => console.log(`Remove failed: ${error.message}`))
}

/**
 * Delete a specific lobby from the database
 * @param {str} lobbyName - the ID of the lobby
 *
 * @return {Promise}
 */
export function destroyLobby(lobbyName){
    /*TODO: Remove users in the lobby?*/
    //const name = "AAAB"
    return fbDatabase.ref('lobbies/' + lobbyName).remove()
        // TODO: remove these console.logs... The client should handle failure instead
        .then(()=> console.log("Removed "+ lobbyName + " successfully!"))
        .catch(error => console.log("Remove failed: " + error.message));

    //ref.off() <-- stop listening to this.
}


//General call_api call?


//=====================================
/**
* CLARIFAI BACKEND
*
*
* run: npm install clarifai
*/

//Client and app.
const Clarifai = require('clarifai'); //require the client
const clarifai_app = new Clarifai.App({
  apiKey: clarifai_client_key
});

//List public models to use:
/*
  Celebrities -> Clarifai.CELEBRITY_MODEL
  Food - Clarifai.FOOD_MODEL
  NSFW - Clarifai.NSFW_MODEL
  Demographics - Clarifai.DEMOGRAPHICS_MODEL
  Travel - Clarifai.TRAVEL_MODEL
  General - Clarifai.General model

*/

export const clarifai_models = {
                        CELEBRITIES: Clarifai.CELEBRITY_MODEL,
                        FOOD: Clarifai.FOOD_MODEL,
                        NSFW: Clarifai.NSFW_MODEL,
                        DEMOGRAPHICS: Clarifai.DEMOGRAPHICS_MODEL,
                        GENERAL: Clarifai.GENERAL_MODEL
}


//Call clarifai api
//Documentation https://docs.clarifai.com/api-guide/predict
function compute_image_value(images, model=Clarifai.GENERAL_MODEL, score_type=random_val){

  //Return a promise containing the scores.
  return clarifai_app.models.predict(model, images)
    .then(response => response['outputs'])
    .then(result => {
      const scores = result.map(r => score_type(r.data.concepts));
      return scores
    })
    .catch(error => console.log(error.message));
  //return scores;
}


//Score functions:
/**
 * @param {object} data This contains the concepts from clarifai.
 * @returns {number} score-value
 */
export function random_val(data){
  return Math.random();
}

export function general_val(data){

}

export function nsfw_val(data){
}

//======================================
/**
 * IMGUR API
 *
 */

 /**
  * GALLERIES TO USE:
  */
  export const imgur_galleries = {
                                  FOOD: "FoodPorn",
                                  BURGERS:  "burgers",
                                  PIZZA:  "pizza",
                                  DESSERT: "DessertPorn",
                                  ANIMALS: "aww",
                                  EARTHPORN: "earthporn",
                                  CARS: "carporn",
                                  BEARS: "bears"
                                  /*FEEL FREE TO ADD MORE*/
  }

//Call the imgur api
//Documentation: https://apidocs.imgur.com/?version=latest
/**
 *
 * @param {str} uri
 *
 * @return {Promise}
 */
function imgur_call_api(uri){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", imgur_client_key);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  var url = "https://api.imgur.com/3/" + uri;

  return fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => result.data.filter(d => d.type === "image/jpeg")) //only get images, ignore anything else.
      .catch(error => console.log('error', error));
}

/**
 *
 * @param {str} subreddit
 *
 * @return {Promise} from call_api
 */
function imgur_subreddit(subreddit="FoodPorn"){
  var uri = "gallery/r/"+subreddit+"/top/all";
  return imgur_call_api(uri);
}

//retrieve and add images to a specific lobby-code. ONLY THE HOST OF THE GAME CAN USE THIS!!!
//Documentation: https://apidocs.imgur.com/?version=latest#98f68034-15a0-4044-a9ac-5ff3dc75c6b0
/**
 *
 * @param {str} subreddit
 * @param {number} num_images
 * @param {str} lobbyCode
 *
 * @return {Promise}
 */
export function update_images(subreddit, num_images, lobbyCode=""){
  if(subreddit==="") {
    var keys = Object.keys(imgur_galleries);
    subreddit = imgur_galleries[keys[ keys.length * Math.random() << 0]];
  }

  //if lobby-code is not valid
  const ref = fbDatabase.ref("/lobbies/" + lobbyCode)
  return ref.once("value").then(snapshot => {
    if(snapshot.exists()){  //If lobby code exists
      imgur_subreddit().then(data => {
        var images = []
        for(let i = 0; i < num_images; i++){
          images[i] = {
            url: data[Math.floor(Math.random() * data.length)].link,
            id: i  + ''
          };
        }
        return ref.child("/images/").set(images)  //Update images.
                .then(() => compute_image_value(images))  //Compute image values.
                .then(values => ref.child("/imagesValues/").set(values)) //Update image values.
                .catch(error => console.log(error.message));

      });
    }else {
      //lobby does not exist
      throw new Error("Lobby " + lobbyCode + " does not exist!"); //Failure!
    }
  })
}

//Function that allows users to get images and do something with them.
//Inspired from this thread: Problem is asynchronousicity, solved by encapsulating it with callback function.
//https://stackoverflow.com/questions/34905600/best-way-to-retrieve-firebase-data-and-return-it-or-an-alternative-way
/**
 *
 * @param {str} lobbyCode
 * @param {function} callback
 */
/*
Example usage:

print_images(){
  get_images(lobbyCode, images => {
    //Do your stuff with the images here.
    link_0 = images[0] //eg
  })
}
*/
export function get_images(lobbyCode="", callback){
  const ref = fbDatabase.ref("/lobbies/" + lobbyCode)

  ref.once("value").then(snapshot => {
    if(snapshot.exists()) { //Check if lobby exists
      var images = snapshot.child("images").val();
      callback(images);
      //return snapshot.val();
    }
    else {
      throw new Error("Lobby " + lobbyCode + " does not exist!");
    }
  })
}
