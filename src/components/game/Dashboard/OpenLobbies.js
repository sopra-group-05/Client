import React from "react";
import styled from "styled-components";
import { handleError, api } from "../../../helpers/api";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";
import Box from "../../../views/Box";
import Lobby from "../../shared/models/Lobby";
import JoinLobby from "../../../views/JoinLobby";

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
      const response = await api.get("/lobby");

      if (this.state.lobbies === null && response.data) {
        // make API call every 1s to get Updated lobbies List.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobbies, 1000);
      }

      // Get the returned lobbies and update the state.
      this.setState({ lobbies: response.data, error: null });

      // This is just some data for you to see what is available.
      // Feel free to remove it.
      console.log("request to:", response.request.responseURL);
      console.log("status code:", response.status);
      console.log("status text:", response.statusText);
      console.log("requested data:", response.data);

      // See here to get more data.
      console.log(response);
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
    // todo: make actual call to api as soon as it's ready
    //this.getLobbies();

    // todo: remove when actual api call can be made
    const lobby1 = new Lobby({
      id: 1,
      lobbyName: "Lobby1",
      language: "EN",
      gameMode: 0
    });
    const lobby2 = new Lobby({
      id: 2,
      lobbyName: "Some Other Name",
      language: "DE",
      gameMode: 1
    });
    const someLobbies = [lobby1, lobby2];
    setTimeout(() => {
      this.setState({ lobbies: someLobbies });
    }, 500);
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
                    return <JoinLobby lobby={l} />;
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
