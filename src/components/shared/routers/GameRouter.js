import React from "react";
import styled from "styled-components";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "../../game/Dashboard";
import Profile from "../../game/Profile/Profile";
import LobbyPage from "../../game/Lobby/LobbyPage";
import PlayingContainer from "../../game/Playing/PlayingContainer";
import EndOfGameContainer from "../../game/EndOfGame/EndOfGameContainer";
import FullRules from "../../game/Rules/FullRules";
import { api } from "../../../helpers/api";
import Lobby from "../models/Lobby";
import Popup from "../../../views/Popup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
    this.redirectToLobby = this.redirectToLobby.bind(this);
    this.triggerPopup = this.triggerPopup.bind(this);
  }
  async componentDidMount() {
    // this will check if the logged in user is in a game (=is a player).
    // if true it will redirect that user to the lobby page!

    // only make check and redirect when Player is not already in a lobby.
    if (!this.props.location.pathname.includes("lobby")) {
      try {
        api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
        const response = await api.get("/isPlayer");
        if (response.data !== "") {
          // if Player exists and The Status of the player is anything else than empty
          const lobbies = await api.get("/lobbies");
          lobbies.data.forEach(l => {
            // check each lobby if the player is in it
            const lobby = new Lobby(l);
            lobby.players.forEach(player => {
              // check each player in that lobby. Is this player == user
              if (player.id == localStorage.getItem("userId")) {
                this.triggerPopup();
                this.redirectToLobby(lobby.id);
              }
            });
          });
        }
      } catch (error) {
        // todo handle error
      }
    }
  }

  redirectToLobby(lobbyId) {
    const path = "/game/lobby/" + lobbyId;
    console.log("redirecting to " + path);
    this.props.history.push(path);
  }

  triggerPopup() {
    this.setState({ showPopup: !this.state.showPopup });
  }

  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Switch>
          <Route
            exact
            path={`${this.props.base}/dashboard`}
            render={() => <Dashboard />}
          />

          <Route
            exact
            path={`${this.props.base}/dashboard/profile/:id`}
            component={Profile}
          />

          <Route
            exact
            path={`${this.props.base}`}
            render={() => <Redirect to={`${this.props.base}/dashboard`} />}
          />

          <Route
            exact
            path={`${this.props.base}/lobby/:id`}
            component={LobbyPage}
          />

          <Route
            exact
            path={`${this.props.base}/rules`}
            component={FullRules}
          />

          <Route
            exact
            path={`${this.props.base}/lobby/:id/game`}
            component={PlayingContainer}
          />
          <Route
            exact
            path={`${this.props.base}/lobby/:id/gameover`}
            component={EndOfGameContainer}
          />
        </Switch>
        {this.state.showPopup && (
          <Popup setShowPopup={this.triggerPopup}>
            You were automatically redirected to your lobby.
          </Popup>
        )}
      </Container>
    );
  }
}
/*
 * Don't forget to export your component!
 */
export default withRouter(GameRouter);
