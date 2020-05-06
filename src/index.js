import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from './js/_reducers/rootReducer';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {BrowserRouter} from "react-router-dom";
import {setUsername, reconnectToLobby} from './js/actions/gameSessionActions'

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
    rootReducer,
    applyMiddleware(
        // This is what allows us to dispatch functions rather than objects
        ReduxThunk
    )
)

const gameSession = JSON.parse(localStorage.getItem("gameSession"))
if (gameSession.currentLobby !== null) {
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
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);