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
import LoginContainer from './js/login/loginContainer'
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom"
import DivBox from './stylingComponents/InitialBoard'
function App() {

  const history = useHistory()

  const aboutNav  = ["About",             () => history.push("/about")]
  const homeNav   = ["Home",              () => history.push("/")]
  const lobbyNav  = ["Go to game session",() => history.push("/lobby")]
  const joinNav   = ["Join game session", () => history.push("/join")]
  const hostNav   = ["Host game session", () => history.push("/host")]
  const gameNav   = ["Start game",        () => history.push("/game")]
  const resultsNav= ["Results",           () => history.push("/results")]
  const hsNav     = ["High Scores",       () => history.push("/high_scores")]
  const loginNav  = ["Log in / Create account", () => history.push("/login")]
  
  return (
    <div>
      <TopBarContainer home = {homeNav} about = {aboutNav} highScores = {hsNav}/>
      <DivBox>
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
          <Route path = "/login">
            <LoginContainer
              home={homeNav}
            />
          </Route>
          <Route path="/">
            <WelcomeContainer
              about={aboutNav} highScores={hsNav}
              join={joinNav} host={hostNav}
              login={loginNav}
            />
          </Route>
        </Switch>
      </DivBox>
    </div>
  );
}

export default App;
