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

Uses a third-party generic presentational component:
**react-list**

## Initialisation:
run the following commands in the root folder:

- <b>npm install</b>
- <b>npm install react-list</b>
- <b>npm install styled-components</b>

If you wish to deploy this on your own firebase project: run the following commands in "functions/" folder:

- <b>npm install --save request</b>
- <b>npm install --save request-promise</b>

and then run deploy them to firebase.

## What we've done

- Implemented the basic layout and navigation of the website.
- Implemented some of the views to various stages of completion
- Implemented a hosting/joining game sessions system.
- Implemented some of the multiplayer synchronization aspects.
- Implemented communication between backend and frontend.
- Implemented the system to generate prompts and correct answers based on image category and model category for some categories.

## What we planned to do after first user-feedback:

- Implement High Scores. **Done**
- Finish implementing the "Full Game" system. **Done**
- Additional image and model categories. **Added aditional images**
- Styling. **Done**
- Implementing better feedback to users when the app is loading or error occurs. **Done**
- Handling clients disconnecting during a game session.

## File Structure
This project consists of a lot of files. Since the project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), a lot of the files are generated by that package and never touch by us.

Here follows a description of all the directories/files in this project:
- `User Feedback/` - <br>Feedback from user-tests
- `functions/` <br> This folder includes all files needed for the Firebase Cloud Functions.
  - `.gitignore`
  - `gameRoundGen.js` - The code that generates questions.
  - `index.js` - Cloud Functions for automatically updating the database. Currently updates getting of images.
  - `package-lock.json` - Dependencies.
  - `package.json` - Dependencies.
- `public/`
  - `404.thml` - Generated by Firebase Command-Line Interface
  - `index.html` - Index html file. Used to set root element for ReactDOM.
  - `manifest.json` - Manifest.
- `src/` <br> This directory contains the main code of the project.
  - `js/`
    - `actions/`<br> All files with redux actions.
      - `gameSessionActions.js` -All actions associated with a game session.
      - `highScoresActions.js` - ...
      - `loaderActions.js` - All actions regarding the loading state of the app.
      - `redirectACtions.js`- ...
      - `utilActions.js` - File for help function that actions will use.
    - `components/` <br> All files with react components
      - `aboutComponent.js` - The component for the about view.
      - `errorComponent.js` - The component for errors.
      - `gameResultsComponent.js` - The component for the results view.
      - `gameRoundComponent.js` - The component for the game view.
      - `highScoresComponent.js` - The component for the high score view.
      - `hostGameComponent.js` - The component for the host game view.
      - `joinGameComponent.js` - The component for the join game view.
      - `loaderComponent.js` - The component for the loader.
      - `lobbyComponent.js` - The component for the lobby view.
      - `loginComponent.js` - The login component.
      - `topBarComponent.js` - The component for the topbar menu.
      - `welcomeComponent.js` - The component for the welcome view.
    - `containers/` <br> All files with react containers
      - `aboutContainer.js` - The container gluing the about view to the redux store.
      - `errorContainer.js` - The container gluing the error view to the redux store.
      - `gameResultsContainer.js` - The container gluing the results view to the redux store.
      - `gameRoundContainer.js` - The container gluing the game view to the redux store.
      - `highScoresContainer.js` - The container gluing the high score view to the redux store.
      - `hostGameContainer.js` - The container gluing the host game view to the redux store.
      - `joinGameContainer.js` - The container gluing the join game view to the redux store.
      - `loaderContainer.js` - The container gluing the loader view to the redux store
      - `lobbyContainer.js` - The container gluing the lobby view to the redux store.
      - `welcomeContainer.js` - The container gluing the welcome view to the redux store
      
    - `reducers/` <br> Reducer files
      - `gameSessionReducer.js` - The reducer handling changes to the game session.
      - `highScoresReducer.js` - The reducer handling changes to high scores.
      - `loaderReducer.js` - The reducer handling state regarding if the application is loading or nor (e.g. when making a call to the backend).
      - `redirectReducer.js` - Reducer to handle redirections.
      - `rootReducer.js` - The root reducer for the redux store.
    - `selectors/`<br> All files with selectors (functions that extract data from the redux state) created with the help of the [redux reselect](https://github.com/reduxjs/reselect) package.
      - `gameSessionSelectors.js` - All selectors for the game session state.
      - `highScoresSelectors.js` - Selectors for the high score state
      - `loaderSelectors.js` - Selector for the loading state
      - `navigationSelectors.js` - Selector for the navigation
    - `styledComponents/` <br> Files with styled components
      - `ImageBox.js` - Styling for the image box and wrapper.
      - `Spinner.js` - Styling for the spinner
    - `backend.js` - All functions handling the interaction between the clients and the firebase realtime database.
  - `style/` <br> CSS files
    - `App.css` -All styling for the app.
    - `Lato-Regular.ttf` - Font to use for the app.
    - `dab.jpg` - Dab image
    - `index.css` - Styling for website

  - `App.js` - The main component of the app.
  - `configureStore.js` - Redux store configuration.
  - `index.js` - The root component of the app.
- `.gitignore`
- `firebase.json` - Firebase configuration file.
- `package-lock.json` - Dependencies.
- `package.json` - Dependencies.
- `useFullLinks.txt` - Some useful links for us in the group.
