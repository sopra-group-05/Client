import React from "react";
import styled from "styled-components";
import { handleError, api } from "../../../helpers/api";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";
import Box from "../../../views/Box";
import JoinLobby from "../../../views/JoinLobby";
import Lobby from "../../shared/models/Lobby";
import { withRouter } from "react-router-dom";
import Popup from "../../../views/Popup";

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AcceptInvite = styled.button`
  color: green;
  background: transparent;
  padding: 1rem;
  border: none;
`;

const DeclineInvite = styled.button`
  color: red;
  background: transparent;
  padding: 1rem;
  border: none;
`;

class OpenLobbies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invitingLobbies: null,
      showPopup: false,
      lobbies: null,
      error: null,
      shouldRedirectToLobby: true
    };
    this.getLobbiesAndInvitations = this.getLobbiesAndInvitations.bind(this);
    this.setShowPopup = this.setShowPopup.bind(this);
    this.acceptInvitation = this.acceptInvitation.bind(this);
    this.declineInvitation = this.declineInvitation.bind(this);
    this.getChildrenForPopup = this.getChildrenForPopup.bind(this);
  }

  async getLobbiesAndInvitations() {
    // get lobbies
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies");

      if (this.state.lobbies === null && response.data) {
        // make API call every 1s to get Updated lobbies List.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobbiesAndInvitations, 1000);
      }

      // redirect to lobby if user is in a lobby
      if (response.data && this.state.shouldRedirectToLobby) {
        // console.log("inside");
        response.data.filter(lobby => {
          lobby = new Lobby(lobby);
          if (lobby.players.find(x => x.id == localStorage.getItem("userId"))) {
            this.props.history.push("/game/lobby/" + lobby.id);
          }
        });
        //this.setState({ shouldRedirectToLobby: false });
      }

      const filtered_lobbies = response.data.filter(function(lobby) {
        lobby = new Lobby(lobby);
        return lobby.lobbyStatus === "WAITING";
      });

      // Get the returned lobbies and update the state.
      this.setState({ lobbies: filtered_lobbies, error: null });
    } catch (error) {
      this.setState({
        error:
          error && error.response
            ? error.response.data
            : error && error.message
            ? error.message
            : "Unknown error"
      });
      console.log(
        `Something went wrong while fetching the lobbies: \n${handleError(
          error
        )}`
      );
      clearInterval(this.interval);
    }

    // get invitations
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      // get current userId from local storage
      const userId = localStorage.getItem("userId");
      const response = await api.get("/users/" + userId + "/invitations");
      this.setState({ invitingLobbies: response.data });
      this.setShowPopup(true);
    } catch (error) {
      this.setState({
        error:
          error && error.response
            ? error.response.data
            : error && error.message
            ? error.message
            : "Unknown error"
      });
      console.log(
        `Something went wrong while fetching the invitations: \n${handleError(
          error
        )}`
      );
      clearInterval(this.interval);
    }
  }

  setShowPopup(boolean) {
    this.setState({ showPopup: boolean });
  }

  async acceptInvitation(lobbyId) {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      // get current userId from local storage
      const userId = localStorage.getItem("userId");
      const response = await api.put(
        "/users/" + userId + "/invitations/" + lobbyId + "/accept"
      );
      this.setShowPopup(false);
      // Redirect to Lobby Page
      this.props.history.push("/game/lobby/" + lobbyId);
      clearInterval(this.interval);
    } catch (error) {
      this.setState({
        error:
          error && error.response
            ? error.response.data
            : error && error.message
            ? error.message
            : "Unknown error"
      });
      console.log(
        `Something went wrong while accepting the invitation: \n${handleError(
          error
        )}`
      );
      clearInterval(this.interval);
    }
  }

  async declineInvitation(lobbyId) {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      // get current userId from local storage
      const userId = localStorage.getItem("userId");
      const response = await api.put(
        "/users/" + userId + "/invitations/" + lobbyId + "/decline"
      );
    } catch (error) {
      this.setState({
        error:
          error && error.response
            ? error.response.data
            : error && error.message
            ? error.message
            : "Unknown error"
      });
      console.log(
        `Something went wrong while accepting the invitation: \n${handleError(
          error
        )}`
      );
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.getLobbiesAndInvitations();
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    clearInterval(this.interval);
  }

  getChildrenForPopup() {
    return;
  }

  render() {
    return (
      <Box title="Open Lobbies">
        <MessageHandler
          success={false}
          show={this.state.error}
          message={this.state.error}
        />
        {!this.state.lobbies ? (
          !this.state.error && <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.lobbies.length
                ? this.state.lobbies.map(l => {
                    return (
                      <PlayerContainer key={l.id}>
                        <JoinLobby
                          joinLobby={this.joinLobbyFunction}
                          lobby={l}
                        />
                      </PlayerContainer>
                    );
                  })
                : "There are no Lobbies for you to join"}
            </Users>
            {this.state.showPopup && this.state.invitingLobbies.length > 0 && (
              <Popup setShowPopup={this.setShowPopup}>
                {this.state.invitingLobbies.map(lobby => {
                  return (
                    <li key={lobby.id}>
                      You have been invited to join {lobby.lobbyName}!
                      <AcceptInvite
                        onClick={() => this.acceptInvitation(lobby.id)}
                      >
                        Accept
                      </AcceptInvite>
                      <DeclineInvite
                        onClick={() => this.declineInvitation(lobby.id)}
                      >
                        Decline
                      </DeclineInvite>
                    </li>
                  );
                })}
              </Popup>
            )}
          </div>
        )}
      </Box>
    );
  }
}

export default withRouter(OpenLobbies);
