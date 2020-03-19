import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from './js/_reducers/rootReducer';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {BrowserRouter} from "react-router-dom";

const store = createStore(
    rootReducer,
    applyMiddleware(
        // This is what allows us to dispatch functions rather than objects
        ReduxThunk
    )
)

ReactDOM.render(
    <Provider store = {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);