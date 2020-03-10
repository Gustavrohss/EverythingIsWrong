import {fbDatabase} from "./firebaseConfig"

/* Here we have functions to read and write from the database*/

//Create a lobby in the database
export function createLobby(hostName) {
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let name = ""
    for (let i = 0; i < 4; i++) { name += CHARS.charAt(Math.floor(Math.random() * CHARS.length)) }
    fbDatabase.ref("/lobbies/" + name).set({
        host: hostName
    });
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

}

//Delete lobby
export function destroyLobby(lobbyName){
    /*TODO: Remove users in the lobby?*/

    fbDatabase.ref('lobbies/' + lobbyName).remove()
        .then(()=> console.log("Removed "+ lobbyName + " successfully!"))
        .catch(error => console.log("Remove failed: " + error.message));
}