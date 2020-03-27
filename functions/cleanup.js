const functions = require('firebase-functions')

exports.CLEANUP = functions.database.ref("/lobbies/{lobbyID}/players")
    .onDelete((snapshot, context) => {
        if (Object.keys(context.params).length < 1) {
            snapshot.ref.parent.remove()
        } 
    })