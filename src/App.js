import React from 'react';
import './App.css';
import WelcomeContainer from './js/welcome/welcomeContainer'
import AboutContainer from './js/about/aboutContainer'
import LobbyContainer from './js/lobby/lobbyContainer'
import JoinGameContainer from './js/joinGame/joinGameContainer'
import HostGameContainer from './js/hostGame/hostGameContainer'
import GameRoundContainer from './js/gameRound/gameRoundContainer'
import GameResultsContainer from './js/gameResults/gameResultsContainer'
import HighScoresContainer from './js/highScores/highScoresContainer'
import TopBarContainer from './js/topBar/topBarContainer'
import {
  Switch,
  Route
} from "react-router-dom"

function App() {

  //const history = useHistory()

  const aboutNav  = ["About",               "/about"]
  const homeNav   = ["Home",                "/"]
  const lobbyNav  = ["Go to game session",  "/lobby"]
  const joinNav   = ["Join game session",   "/join"]
  const hostNav   = ["Host game session",   "/host"]
  const gameNav   = ["Start game",          "/game"]
  const resultsNav= ["Results",             "/results"]
  const hsNav     = ["High Scores",         "/high_scores"]

  return (
    <div>

      {/* Third party generic presentational component */}
      <TopBarContainer
        home = {homeNav} about = {aboutNav} highScores = {hsNav}
      />

      <Switch>                {/* Parent node for routes */}
        <Route path="/about"> {/* Route usage */}
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
            game={gameNav}
          />
        </Route>
        <Route path="/game">
          <GameRoundContainer
            results={resultsNav}
          />
        </Route>
        <Route path="/results">
          <GameResultsContainer
            home={homeNav}
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
