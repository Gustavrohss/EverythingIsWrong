const functions = require('firebase-functions');

// Functions here are not available in the program necessarily
// They are just written here and the exported to Firebase

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