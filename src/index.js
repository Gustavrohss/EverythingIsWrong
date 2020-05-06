import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import './index.css'
import App from './App'
import configureStore, {history} from './configureStore'
import {setUsername, reconnectToLobby} from './js/actions/gameSessionActions'

const store = configureStore(/* provide initial state if any */)

const gameSession = JSON.parse(localStorage.getItem("gameSession"))
if (gameSession && gameSession.currentLobby !== null) {
    store.dispatch(setUsername(gameSession.username))
    const returned = store.dispatch(
      reconnectToLobby(gameSession.currentLobby, gameSession.playerID)
    )
}

store.subscribe(() => {
  const obj = JSON.stringify({
    username:     store.getState().gameSession.self.username,
    currentLobby: store.getState().gameSession.lobbyID,
    playerID:     store.getState().gameSession.self.playerID
  })
  localStorage.setItem("gameSession", obj)
})

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
