import {fbDatabase} from "./firebaseConfig"

/* Here we have functions to read and write from the database*/

// Create a lobby in the database
// Returns a promise which returns the new lobby and the player ID of the host.
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

// Join an existing lobby
// Returns a promise which returns the new lobby and the player ID of the user
export function joinLobby(lobbyCode, user) {
    const ref = fbDatabase.ref("/lobbies/" + lobbyCode)

    return ref.once("value").then(snapshot => {
        if(snapshot.exists()) { //Check if lobby exists
            let pushReturn = fbDatabase.ref("/lobbies/" + lobbyCode + "/players").push({ //push new player
                name: user,
                score: 0
            });

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

// Set listeners to the lobby with ID `lobbyCode`
// Returns a function that will unsubscribe to the lobby
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

// Delete a specific player in a lobby
// NOTE: make sure to unsubscribe listeners before removal
export function deletePlayer(lobbyCode, playerID){
    return fbDatabase.ref(`lobbies/${lobbyCode}/players/${playerID}`).remove()
        .then(() => console.log(`Successfully removed player ${playerID} from ${lobbyCode}`))
        .catch(error => console.log(`Remove failed: ${error.message}`))
}

//Delete lobby
export function destroyLobby(lobbyName){
    /*TODO: Remove users in the lobby?*/
    //const name = "AAAB"
    return fbDatabase.ref('lobbies/' + lobbyName).remove()
        .then(()=> console.log("Removed "+ lobbyName + " successfully!"))
        .catch(error => console.log("Remove failed: " + error.message));

    //ref.off() <-- stop listening to this.
}
