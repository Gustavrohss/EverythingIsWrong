import fbDatabase from "firebaseConfig.js"

/* Here we have functions to read and write from the database*/

//Create a lobby in the database
function createLobby(lobbyName, user){
    var lobbyData = {
        name: lobbyName
        //owner: user
    };
    fbDatabase.ref().set(lobbyData);
}

//Create a name in a lobby
function createUser(username){
    var userData = {
        name : username
    }
    var newUserKey = fbDatabase.ref().child()
}

//Highscore stuff
function updateScore(){

}

//Delete name in a lobby
function deleteUser(){

}

//Delete lobby
function destroyLobby(lobbyName){
    /*TODO: Remove users in the lobby?*/

    fbDatabase.ref('lobbies/' + lobbyName).remove()
        .then(()=> console.log("Removed "+ lobbyName + " successfully!"))
        .catch(error => console.log("Remove failed: " + error.message));
}