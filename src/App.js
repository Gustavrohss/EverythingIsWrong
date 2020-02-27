import React from 'react';
import './App.css';
import Clarifai from 'clarifai'
import WelcomeContainer from './js/welcome/welcomeContainer'
import AboutContainer from './js/about/aboutContainer'
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";


function App() {
  let history = useHistory()

  const aboutNav = ["About", () => history.push("/about")]
  const homeNav = ["Home", () => history.push("/")]

  return (
    <div>
      <Switch>
        <Route path="/about">
          <AboutContainer home={homeNav}/>
        </Route>
        <Route path="/">
          <WelcomeContainer about={aboutNav}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

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
