# Everything is Wrong

Everything is Wrong is a multiplayer game. Anyone can host a game, and then anyone can join the game.

Once the game starts, the players will be presented with a set of images and a question ("prompt") to go with them. The players will choose an image as their answer to the prompt. If the player is correct, they get a point. The game goes on for some amount of rounds, and then has one (or several) winners.

The images are fetched from the <b>Imgur</b> API. This is where the title "Everything is Wrong" comes into play.
The images fetched are of a certain category, such as images of <i>food</i>, <i>bears</i> or <i>cars</i>. These images are then fed into a <b>Clarifai</b> image recognition model API that is intentionally chosen to not match the image category. If the category of the images is <i>bears</i>, they might be sent to an image recognition model for <i>food</i>. This model might find some partial matches; it could detect some <i>lemon</i> or some <i>coffee</i> in the image of the bear. From these results the question is generated.

The questions might seem arbitrary and somewhat impossible to answer with any sort of accuracy. This is the point of the game. It's not supposed to be a serious multiplayer experience, but rather a fun party-game type of experience. 

## Technologies

For the frontend development we're using:
- <b>React</b>
- <b>Redux</b> with [**Redux-Thunk**](https://github.com/reduxjs/redux-thunk) and [**Reselect**](https://github.com/reduxjs/reselect)

For the backend development we're using:
- <b>Firebase</b>

## What we've done

- Implemented the basic layout and navigation of the website
- Implemented some of the views to various stages of completion
- Implemented a hosting/joining game sessions system.
- Implemented some of the multiplayer synchronization aspects.
- Implemented communication between backend and frontend.
- Implemented the system to generate prompts and correct answers based on image category and model category for some categories.
- <b>TODO</b>

## What we plan to do

- Implement High Scores.
- Finish implementing the "Full Game" system.
- Additional image and model categories.
- Styling.
- Implementing better feedback to users when the app is loading or error occurs.
- Handling clients disconnecting during a game session
- <b>TODO</b>

## File Structure
This project consists of a lot of files. Since the project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), a lot of the files are generated by that package and never touch by us.

Here follows a description of all the directories/files in this project:

- `.firebase/`
  - ???
- `functions/` <br> This folder includes all files needed for the Firebase Cloud Functions.
  - [**TODO**: look over these descriptions. Should gitignore be removed from the list?]
  - `.gitignore`
  - `cleanup.js` - The Cloud Function handling deletion of data regarding game sessions without players in the backend
  - `gameRoundGen.js` - The code that generate questions
  - `index.js` - Cloud Functions for automatically updating the database. Currently updates getting of images.
  - `package-lock.json` - **???**
  - `package.json` - **???**
- `public/`
  - `404.thml` - Generated by Firebase Command-Line Interface
  - `index.html` - Index html file. Used to set root element for ReactDOM.
  - `manifest.json` - **???**
- `src/` <br> This directory contains the main code of the project.
  - `js/`
    - `_reducers/`
      - `gameSessionReducer.js` - The reducer handling changes to the game session
      - `loaderReducer.js` - The reducer handling state regarding if the application is loading or nor (e.g. when making a call to the backend).
      - `rootReducer.js` - The root reducer for the redux store
    - `about/` <br> All files regarding the about view, i.e. the view with information about the application.
      - `aboutComponent.js` - The component for the about view
      - `aboutContainer.js` - The container gluing the about view to the redux store
    -  `actions/` <br> All files with redux actions.
      - `gameSessionActions.js` -All actions associated with a game session
      - `loaderActions.js` - All actions regarding the loading state of the app [**TODO**: update this description]
      - `utilActions.js` - File for help function that actions will use
    - `gameResults/` <br> All files regarding the results view, which is the view where the results are displayed at the end of a game session.
      - `gameResultsComponent.js` - The component for the results view
      - `gameResultsContainer.js` - The container gluing the results view to the redux store
    - `gameRound/` <br> All files regarding the game view, which is the view where questions are displayed.
      - `gameRoundComponent.js` - The component for the game view
      - `gameRoundContainer.js` - The container gluing the game view to the redux store
    - `highScores/` <br> All files regarding the high score view.
      - `highScoresComponent.js` - The component for the high score view
      - `highScoresContainer.js` - The container gluing the high score view to the redux store
    - `hostGame/` <br> All files regarding the host game view, which is the view in which a user creates a new game session.
      - `hostGameComponent.js` - The component for the host game view
      - `hostGameContainer.js` - The container gluing the host game view to the redux store
    - `joinGame/` <br> All files regarding the join game view, which is the view in which a user joins an already created game session.
      - `joinGameComponent.js` - The component for the join game view
      - `joinGameContainer.js` - The container gluing the join game view to the redux store
    - `lobby/` <br> All files regarding the lobby view, which is where a user that has joined a game waits until the game begins.
      - `lobbyComponent.js` - The component for the lobby view
      - `lobbyContainer.js` - The container gluing the lobby view to the redux store
    - `selectors/` <br> All files with selectors (functions that extract data from the redux state) created with the help of the [redux reselect](https://github.com/reduxjs/reselect) package.
      - `gameSessionSelectors.js` - All selectors for the game session state
    - `welcome/` <br> All files regarding the welcome view, which is the home page of this app.
      - `welcomeComponent.js` - The component for the welcome view
      - `welcomeContainer.js` - The container gluing the welcome view to the redux store
    - `backend.js` - All functions handling the interaction between the clients and the backend, as well as functions handling API calls ([**TODO**: should these be removed from this file??])
    - `configAPI.js` - File containing the API keys for Clarifai and Imgur
    - `firebaseConfig.js` - **???**
    - `gameRoundGen.js` - DEPRECATED (moved to `../../../functions/`)
    - `questionGenerationMessaround.js` - DEPRECATED
    - `scoringMessaround.js` - **???**
  - `App.css` - All styling for the app
  - `App.js` - The main component of the app
  - `index.css` - **???**
  - `index.js` - The root component of the app
- `.firebaserc` - **???**
- `.gitignore` - configured to ignore some modules which are installed. Also used to ignore files containing keys.
- `firebase-debug.log` - **???**
- `firebase.json` - **???**
- `package-lock.json` - **???**
- `package.json` - **???**
- `useFullLinks.txt` - Some useful links for us in the group
