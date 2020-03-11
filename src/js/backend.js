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

export function setListener(lobbyCode, gameInfoCallback, playerCallback){
    fbDatabase.ref("/lobbies/" + lobbyCode + "/gameInfo/").on("value", snapshot => {
        gameInfoCallback(snapshot.val())
    })

   fbDatabase.ref("/lobbies/" + lobbyCode +"/players/").on("child_changed", (childSnapshot, prevChildKey) => {
    playerCallback(childSnapshot.val(), childSnapshot.key) // childSnapshot.val() <--- {name: "childName", score: (int)}
    //console.log(childSnapshot.val());
    //console.log("No comes the prevChildKey!");
    //console.log(prevChildKey);
})
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
