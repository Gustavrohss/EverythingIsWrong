## Everything is Wrong

Everything is Wrong is a multiplayer game. Anyone can host a game, and then anyone can join the game.

Once the game starts, the players will be presented with a set of images and a question ("prompt") to go with them. The players will choose an image as their answer to the prompt. If the player is correct, they get a point. The game goes on for some amount of rounds, and then has one (or several) winners.

The images are fetched from the <b>Imgur</b> API. This is where the title "Everything is Wrong" comes into play.
The images fetched are of a certain category, such as images of <i>food></i>, <i>bears</i> or <i>cars</i>. These images are then fed into a <b>Clarifai</b> image recognition model API that is intentionally chosen to not match the image category. If the category of the images is <i>bears</i>, they might be send to an image recognition model for <i>food</i>. This model might find some partial matches; it could detect some <i>lemon</i> or some <i>coffee</i> in the image of the bear. From these results the question is generated.

The questions might seem arbitrary and somewhat impossible to answer with any sort of accuracy. This is the point of the game. It's not supposed to be a serious multiplayer experience, but rather a fun party-game type of experience. 

### Technologies

For the frontend development we're using:
- <b>React</b>
- <b>Redux</b> with <b>Redux-Thunk</b>
For the backend development we're using:
- <b>Firebase</b>

### What we've done

- Implemented the basic layout and navigation of the website
- Implemented some of the views to various stages of completion
- Implemented a hosting/joining game sessions system.
- Implemented some of the multiplayer synchronization aspects.
- Implemented communication between backend and frontend.
- Implemented the system to generate prompts and correct answers based on image category and model category for some categories.
- <b>TODO</b>

### What we plan to do

- Implement High Scores.
- Finish implementing the "Full Game" system.
- Additional image and model categories.
- Styling.
- <b>TODO</b>

### File Structure

<b>TODO</b>
