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
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom"
// import {generatePromptAndScores} from './js/gameRoundGen'

function App() {

  const history = useHistory()
  // const TEST = generatePromptAndScores(
  //   "MODEL_FOOD",
  //   "r/bears",
  //   [
  //     {
  //       outputs: [{
  //         data: {
  //           concepts: [
  //             {name: "lemon", value: 0.5},
  //             {name: "coffee", value: 0.2},
  //             {name: "pie", value: 0.7}
  //           ]
  //         }
  //       }]
  //     },
  //     {
  //       outputs: [{
  //         data: {
  //           concepts: [
  //             {name: "steak", value: 0.2},
  //             {name: "apple", value: 0.9},
  //             {name: "candy", value: 0.02}
  //           ]
  //         }
  //       }]
  //     },
  //     {
  //       outputs: [{
  //         data: {
  //           concepts: [
  //             {name: "mint", value: 0.1}
  //           ]
  //         }
  //       }]
  //     }
  //   ],
  //   [
  //     "IMAGE1", "IMAGE2", "IMAGE3"
  //   ]
  // )
  // console.log(TEST)

  // Navigation labels and custom events
  const aboutNav  = ["About",       () => history.push("/about")]
  const homeNav   = ["Home",        () => history.push("/")]
  const lobbyNav  = ["Lobby",       () => history.push("/lobby")]
  const joinNav   = ["Join game",   () => history.push("/join")]
  const hostNav   = ["Host game",   () => history.push("/host")]
  const gameNav   = ["Game round",  () => history.push("/game")]
  const resultsNav= ["Results",     () => history.push("/results")]
  const hsNav     = ["High Scores", () => history.push("/high_scores")]

  return (
    <div>
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
