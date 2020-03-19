import {fbDatabase} from "./firebaseConfig"
import {imgur_client_ID} from "./configAPI_imgur"

/**
 * Here we have functions to read and write from the Realtime Database
 * Basic guide for read/write operations: https://firebase.google.com/docs/database/web/read-and-write
 * Docs: https://firebase.google.com/docs/reference/js/firebase.database
 *
 * The structure of the database is:
 * lobbise: {
 *   <lobbyID>: {
 *     players: {
 *       gameInfo: {
 *         round: (int)
 *       },
 *       <playerID>: {
 *         score: (int),
 *         name: (str),
 *         status: LOBBY/FETCHING/READY/ANSWERING
 *       },
 *       settings: {
 *         gameType: 0
 *       }
 *     }
 *   }
 * }
 */

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
            host: {
                name: hostName,
                score: 0
            }
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
            let pushReturn = fbDatabase.ref("/lobbies/" + lobbyCode + "/players").push({ //push new player
                name: user,
                score: 0
            });

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

export function readLobby(){

}

// Update the score of a specific player in a specific lobby
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



//=====================================
/*
CLARIFAI BACKEND
*/



//Call the imgur api
function imgur_call_api(uri){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", imgur_client_ID);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    //body: formdata,
    redirect: 'follow'
  };

  var url = "https://api.imgur.com/3/" + uri;

  return fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => result.data)
      .catch(error => console.log('error', error));
}

function imgur_subreddit(subreddit="FoodPorn"){
  var uri = "gallery/r/"+subreddit+"/top/all";
  return imgur_call_api(uri); 
}

//retrieve and add images to a specific lobby-code. ONLY THE HOST OF THE GAME CAN USE THIS!!!
//MIGHT GET REPLACED BY A CLOUD FUNCTION INSTEAD
export function update_images(subreddit, num_images, lobbyCode=""){
  //if lobby-code is not valid
  const ref = fbDatabase.ref("/lobbies/" + lobbyCode)
  return ref.once("value").then(snapshot => {
    if(snapshot.exists()){  //If lobby code exists
      imgur_subreddit().then(data => {
        var images = {}
        for(let i = 0; i < num_images; i++){
          //console.log(data[Math.floor(Math.random() * data.length)])
          images[i] = data[Math.floor(Math.random() * data.length)].link
        }
        return fbDatabase.ref("/lobbies/"+lobbyCode+"/images/").set(images) //update the database.
        //console.log(data)
      });
    }else {
      //lobby does not exist
      throw new Error("Lobby " + lobbyCode + " does not exist!"); //Failure!
    }
  })
}

//Function that get images and do something with them.
//Inspired from this thread: Problem is asynchronousicity
//https://stackoverflow.com/questions/34905600/best-way-to-retrieve-firebase-data-and-return-it-or-an-alternative-way
export function get_images(lobbyCode="", callback){
  const ref = fbDatabase.ref("/lobbies/" + lobbyCode)

  ref.once("value").then(snapshot => {
    if(snapshot.exists()) { //Check if lobby exists
      //console.log("images exxist!");
      //console.log(snapshot.val());
      //console.log(snapshot.val()[0]);
      var images = snapshot.child("images").val();
      callback(images);
      //return snapshot.val();
    }
    else {
      throw new Error("Lobby " + lobbyCode + " does not exist!");
    }
  })
}
/*
Example usage:

print_images(){
  get_images(lobbyCode, images => {
    //Do your stuff with the images here.
    link_0 = images[0] //eg
  })
}
*/