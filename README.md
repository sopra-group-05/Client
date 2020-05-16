# SoPra FS20 - Just One M4 - Client

## Introduction

Welcome to the digital version of the game Just One! Players are able to register and login and get a good look
at the dashboard. Users can join other lobbies, start a game with different sizes of decks, or play in 
English or German against other Players in real time. There's also a game mode where you can play against Bots. 

Players can also compare each other via a leader Board. Their score will be set according to the 
time they need to come up with the clues and guesses and whether they were eliminated or not.

We are using ReactJS in the Frontend and Java (Spring Boot) in the Backend. The Frontend will interact with the Backend
via a REST API. We decided to consume different external APIs, one in the form of synonyms and antonyms for the Bots
and another to show a definition of a mystery word (if a player doesn’t know what it is).


## Technologies used

We use the JavaScript library React for the Client-Side of Just One. Read and go through those Tutorials, It will make your life easier!

- To learn React, check out the [React documentation](https://reactjs.org/).
- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](http://localhost:3000) and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Once you have done all of this, in the template there are two main external dependencies that you should look at:

- [styled-components](https://www.styled-components.com/docs)
  It removes the mapping between components and styles (i.e. external css files). This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it
* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) Declarative routing for React being a collection of navigational components that compose declaratively with your application. 

## High-level components

In this section we'll tell you about three main components and their role.

### Dashboard
As the name suggest the Dashboard is the first Component a user sees when he's logged in. It's the main navigation
for all users. They can choose what they want to do next: Do they want to create a lobby for others to join? Do they 
want to create a lobby with or without bots? Play in German or English? Users can also join an existing lobby from the
dashboard or just have a look at all users that are currently online.

[Dashboard.js](/src/components/game/Dashboard.js)

### LobbyContainer
The LobbyContainer is the Component that you will see when you created a lobby or joined another one. It's the 
starting point to start a new game and invite other players to the lobby. It's also an overview of all players
that already joined the lobby.

[LobbyContainer.js](/src/components/game/Lobby/LobbyContainer.js)

### Playing Container
The PlayingContainer is the heart of the actual game in the frontend. It manages which components are shown at what 
point of the game. It does so by looking at the status of the player of the client and matching that to the correct
component that corresponds to that status. On the other hand it also has the task to connect to the server every 
second to get the newest information about the lobby and pass that information on to the component one level down.

[PlayingContainer.js](/src/components/game/Playing/PlayingContainer.js)

## Launch & Deployment 

### Prerequisites and Installation

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

#### `npm install`

This has to be done before starting the application for the first time (only once).

#### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Once you push a new commit to this repository it will automatically be deployed and released on 
[heroku](https://sopra-fs20-group-05-client.herokuapp.com/login).

## Illustrations [todo]

Describe and illustrate the main user flows of the interface and how does it work?
Add Screenshots!

## Roadmap

Here are two features that you, as a new member of our team, could contribute to this project!

### Adding custom Mystery-Word Cards

As a User I want to be able to add mystery word cards to the Game in order to keep the game interesting and avoid 
playing the same words over and over again.
- On the Lobby-Page there should be a button that opens a add-mystery-word-card form
- In the form there should be five empty spaces to put five mystery words.
- The mystery word should be put to the list of mystery-word-cards.
- The user should be able to specify to which language the card should belong.

### Let the active Player choose which Clue was the best one

As an active Player, I want to be able to choose the best clue presented in order to award the player who wrote 
it some extra points.
- Alle Clues should be visible to the active Player.
- The active Player should be able to click on the best clue.
- The Player that wrote the chosen clue should get extra points.
- The active Player should be able to skip if no clue stands out.

## Authors and acknowledgement

- [Adiboeh](https://github.com/Adiboeh)
- [Floribur](https://github.com/Floribur)
- [nmulle](https://github.com/nmulle)
- [yritz](https://github.com/yritz)
- [mgoki](https://github.com/mgoki)
- [InfoYak](https://github.com/InfoYak)

## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/) 

>Thanks to Lucas Pelloni for the template
