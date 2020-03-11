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

export function leaveLobby(lobbyCode, playerID) {
  // TODO: write this function
  return new Promise((resolve, reject) => resolve()) // Just placeholder code!
}

export function setListener(lobbyCode, gameInfoCallback, playerCallback){
    const gameInfoListener = fbDatabase.ref("/lobbies/" + lobbyCode + "/gameInfo/")
      .on("value", snapshot => {
          console.log("Rewritten gameinfo in lobby " + lobbyCode)
          gameInfoCallback({gameInfo: snapshot.val()})
      })

    const players = fbDatabase.ref("/lobbies/" + lobbyCode +"/players/")
    const playerChangedListener = players.on("child_changed",
      (childSnapshot, prevChildKey) => {
          console.log("Player " + childSnapshot.key + " changed in lobby " + lobbyCode)
          playerCallback({
            player: childSnapshot.val(),
            playerID: childSnapshot.key
          }) // childSnapshot.val() <--- {name: "childName", score: (int)}
          //console.log(childSnapshot.val());
          //console.log("No comes the prevChildKey!");
          //console.log(prevChildKey);
      })

    // This will currently be invoced for all initial children and afterwards for all new
    // TODO: playerCallback should only be called when a new child is added.
    const playerAddedListener = players.on("child_added",
      (childSnapshot, prevChildKey) => {
          console.log("Player " + childSnapshot.key + " added in lobby " + lobbyCode)
          playerCallback({
            player: childSnapshot.val(),
            playerID: childSnapshot.key
          }) // childSnapshot.val() <--- {name: "childName", score: (int)}
      })

    return {gameInfoListener, playerChangedListener, playerAddedListener}
}

export function stopListener(lobbyCode, {gameInfoListener, playerChangedListener, playerAddedListener}) {
    console.log("Remove listeners in lobby " + lobbyCode)
    fbDatabase.ref("/lobbies/" + lobbyCode + "/gameInfo/").off("value", gameInfoListener)
    const players = fbDatabase.ref("/lobbies/" + lobbyCode +"/players/")
    players.off("child_changed", playerChangedListener)
    players.off("child_added", playerAddedListener)
}

export function readLobby(){

}

//Create a name in a lobby
export function createUser(username){
    var userData = {
        name : username
    }
    var newUserKey = fbDatabase.ref().child()
}

//Highscore stuff
export function updateScore(){

}

//Delete name in a lobby
export function deleteUser(){
    //ref.off() <-- stop listening to this.
}

//Delete lobby
export function destroyLobby(lobbyName){
    /*TODO: Remove users in the lobby?*/
    //const name = "AAAB"
    fbDatabase.ref('lobbies/' + lobbyName).remove()
        .then(()=> console.log("Removed "+ lobbyName + " successfully!"))
        .catch(error => console.log("Remove failed: " + error.message));

    //ref.off() <-- stop listening to this.
}
