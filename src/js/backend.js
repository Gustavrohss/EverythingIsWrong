import fbDatabase from "firebaseConfig.js"

/* Here we have functions to read and write from the database*/

//Create a lobby in the database
export function createLobby(lobbyName, user){
    var lobbyData = {
        name: lobbyName
        //owner: user
    };
    fbDatabase.ref().set(lobbyData);
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