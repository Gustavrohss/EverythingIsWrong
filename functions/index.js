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

exports.redditRequest = functions.https.onCall(data => {
    var imgur_client_id = "Client ID 5ca180817daefb2" //api id here.

    /*------ Test code to see that imgur get image api works. */
    var myHeaders = new Headers();
    myHeaders.append("Authorization", imgur_client_id);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const call_api = (uri) => {
        var url = "https://api.imgur.com/3/" + uri; 
        return fetch(url, requestOptions)
        .then(response => response.json())
        //.then(data => console.log(data))
        //.catch(error => console.log('error', error));
    }

    const subreddit_gallery = (subreddit_name="FoodPorn") => {
        var uri = "gallery/r/"+subreddit_name+"/top/all"; 
        return call_api(uri)
    }

    return subreddit_gallery();
})
