import React from 'react';
import './App.css';
import WelcomeContainer     from './js/containers/welcomeContainer'
import AboutContainer       from './js/containers/aboutContainer'
import LobbyContainer       from './js/containers/lobbyContainer'
import JoinGameContainer    from './js/containers/joinGameContainer'
import HostGameContainer    from './js/containers/hostGameContainer'
import GameRoundContainer   from './js/containers/gameRoundContainer'
import GameResultsContainer from './js/containers/gameResultsContainer'
import HighScoresContainer  from './js/containers/highScoresContainer'
import TopBarContainer      from './js/containers/topBarContainer'
import LoginContainer       from './js/containers/loginContainer'
import {
  Switch,
  Route
} from "react-router-dom"
import DivBox from './js/styledComponents/DivBox'
function App() {

  const aboutNav  = ["About",               "/about"]
  const homeNav   = ["Home",                "/"]
  const lobbyNav  = ["Go to game session",  "/lobby"]
  const joinNav   = ["Join game session",   "/join"]
  const hostNav   = ["Host game session",   "/host"]
  const gameNav   = ["Start game",          "/game"]
  const resultsNav= ["Results",             "/results"]
  const hsNav     = ["High Scores",         "/high_scores"]
  const loginNav  = ["Log in / Create account", "/login"]

  return (
    <DivBox column = {true}>
      <DivBox>
        <TopBarContainer home = {homeNav} about = {aboutNav} highScores = {hsNav}/>
      </DivBox>
      <DivBox>
        <Switch>
          <Route path="/about">
            <AboutContainer/>
          </Route>
          <Route path="/host">
            <HostGameContainer
              lobby={lobbyNav}
            />
          </Route>
          <Route path = "/join">
            <JoinGameContainer
              lobby={lobbyNav}
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
            <GameResultsContainer/>
          </Route>
          <Route path="/high_scores">
            <HighScoresContainer/>
          </Route>
          <Route path = "/login">
            <LoginContainer
              home={homeNav}
            />
          </Route>
          <Route path="/">
            <WelcomeContainer
              join={joinNav} host={hostNav}
              login={loginNav}
            />
          </Route>
        </Switch>
      </DivBox>
    </DivBox>
  );
}

export default App;
