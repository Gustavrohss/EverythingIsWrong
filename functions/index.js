const functions = require('firebase-functions');

// Functions here are not available in the program necessarily
// They are just written here and the exported to Firebase

// THIS DOES NOT SEEM TO WORK
// Example of how realtime database can be used
// Adds a second, more hardcore player and score whenever a score is added
exports.BIGSCORE = functions.database.ref("/highscores/")
    .onCreate(snapshot => {
        const val = snapshot.val()
        return snapshot
            .ref
            .parent
            .push()
            .set({name: val.name.toUpperCase(), score: val.score + 1000})
    })


//=================================
//When a new game round starts, "when game-round changes", make a call to imgur API and choose.abs
//https://firebase.google.com/docs/functions/database-events#handle_event_data
exports.UPDATE_IMAGES = functions.database.ref("/lobbies/{lobbyID}/gameInfo/round")
    .onChange((snapshot, context) => {
        //TODO: add images to this lobby.

    });


//=================================

// THIS DOES NOT WORK EITHER
// Tried several workarounds
// No success
exports.redditRequest = functions.https.onCall(async data => {
    const imgur_client_id = "Client ID 5ca180817daefb2" 
    const myHeaders = new Headers();
    myHeaders.append("Authorization", imgur_client_id);
    const ftch = await fetch(
        `https://api.imgur.com/3/gallery/r/${data.text}/top/all`,
        {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
    )
    const out = await ftch.json()
    return out
})
