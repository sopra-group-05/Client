import React from "react";
import styled from "styled-components";
import { handleError, api } from "../../../helpers/api";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";
import Box from "../../../views/Box";
import JoinLobby from "../../../views/JoinLobby";
import Lobby from "../../shared/models/Lobby";

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

class OpenLobbies extends React.Component {
  constructor() {
    super();
    this.state = {
      lobbies: null,
      error: null
    };
    this.getLobbies = this.getLobbies.bind(this);
  }

  async getLobbies() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies");

      if (this.state.lobbies === null && response.data) {
        // make API call every 1s to get Updated lobbies List.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobbies, 1000);
      }

      // Get the returned lobbies and update the state.
      this.setState({ lobbies: response.data, error: null });
      //console.log(response);
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while fetching the lobbies: \n${handleError(
          error
        )}`
      );
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.getLobbies();
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    clearInterval(this.interval);
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
                      <JoinLobby joinLobby={this.joinLobbyFunction} lobby={l} />
                    );
                  })
                : "There are no Lobbies for you to join"}
            </Users>
          </div>
        )}
      </Box>
    );
  }
}

export default OpenLobbies;
