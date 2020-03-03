import React from 'react';
import './App.css';
import Clarifai from 'clarifai'
import WelcomeContainer from './js/welcome/welcomeContainer'
import AboutContainer from './js/about/aboutContainer'
import LobbyContainer from './js/lobby/lobbyContainer'
import JoinGameContainer from './js/joinGame/joinGameContainer'
import HostGameContainer from './js/hostGame/hostGameContainer'
import GameRoundContainer from './js/gameRound/gameRoundContainer'
import GameResultsContainer from './js/gameResults/gameResultsContainer'
import HighScoresContainer from './js/highScores/highScoresContainer'
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";


function App() {
  imgur_test()
  let history = useHistory()

  const aboutNav = ["About", () => history.push("/about")]
  const homeNav = ["Home", () => history.push("/")]
  const lobbyNav = ["Lobby", () => history.push("/lobby")]
  const joinNav = ["Join game", () => history.push("/join")]
  const hostNav = ["Host game", () => history.push("/host")]
  const gameNav = ["Game round", () => history.push("/game")]
  const resultsNav = ["Results", () => history.push("/results")]
  const hsNav = ["High Scores", () => history.push("/high_scores")]

  return (
    <div>
      <Switch>
        <Route path="/about">
          <AboutContainer 
            home={homeNav}
          />
        </Route>
        <Route path="/host">
          <HostGameContainer
            home={homeNav} lobby={lobbyNav}
          />
        </Route>
        <Route path = "/join">
          <JoinGameContainer
            home={homeNav} lobby={lobbyNav}
          />
        </Route>
        <Route path="/lobby">
          <LobbyContainer
            join={joinNav} host={hostNav}
            game={gameNav}
          />
        </Route>
        <Route path="/game">
          <GameRoundContainer
            lobby={lobbyNav} results={resultsNav}
          />
        </Route>
        <Route path="/results">
          <GameResultsContainer
            home={homeNav} game={gameNav}
          />
        </Route>
        <Route path="/high_scores">
          <HighScoresContainer
            home={homeNav}
          />
        </Route>
        <Route path="/">
          <WelcomeContainer 
            about={aboutNav} highScores={hsNav}
            join={joinNav} host={hostNav}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

/*
function test() {  
  const clar = new Clarifai.App({
    apiKey: "abc" // Your key here
  })

  const tests = [
    // Surprisingly super safe and not drugs at all I promise Officer
    "https://www.filsantejeunes.com/wp-content/uploads/2005/05/cannabis.jpg",
    // A lovely dinner
    "http://images.media-allrecipes.com/userphotos/960x960/3756023.jpg",
    // Starbucks meme pie
    "http://4.bp.blogspot.com/-iKXQ9EnezVU/TwJgViFHMCI/AAAAAAAAIOQ/SXx8en8vLHM/s1600/IMG_0441.JPG",
    // A dirty, dirty apple. It knows what it did.
    "http://1.bp.blogspot.com/-sm2PC8KW-l4/UDP7Z4Mz80I/AAAAAAAAB6g/j91oeuESMcs/s1600/apple.jpg"
  ]

  // Be careful! These count towards the 5000 API requests. Don't overtest, I guess?
  tests.forEach(t => {
    // Can be many models! Autocomplete might give you some suggestions.
    clar.models.initModel({id: Clarifai.MODERATION_MODEL})
        .then(generalModel => {
          return generalModel.predict(t);
        })
        .then(response => {
          // Log entire response object for more specific data.
          // The "concepts" seem to be the part most important to us.
          console.log(response["outputs"][0]["data"]["concepts"])
        })
      })
}
*/

function imgur_test(){
  var imgur_client_id = "Client ID 5ca180817daefb2" //api id here.
//const imgur_client_key = "2d28cb41585547e755a4927c39461ecc3d2c4f45"


  /*------ Test code to see that imgur get image api works. */
  var myHeaders = new Headers();
  myHeaders.append("Authorization", imgur_client_id);

  var formdata = new FormData();

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    //body: formdata,
    redirect: 'follow'
  };


  const call_api = (uri) =>{
    debugger;
      var url = "https://api.imgur.com/3/" + uri; 
      fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log('error', error));
  }

  const subreddit_gallery = (subreddit_name="FoodPorn") => {
      var uri = "gallery/r/"+subreddit_name+"/top/all"; 
      //"https://api.imgur.com/3/gallery/r/FoodPorn/top/all/3"
      call_api(uri)
  }

  subreddit_gallery();
  //subreddit_gallery("aww");
}
