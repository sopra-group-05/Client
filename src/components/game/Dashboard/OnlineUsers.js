import React from "react";
import styled from "styled-components";
import { handleError, api } from "../../../helpers/api";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";
import Player from "../../../views/Player";
import Box from "../../../views/Box";
import User from "../../shared/models/User";

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

class OnlineUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
      error: null
    };
    this.getUsers = this.getUsers.bind(this);
  }

  async getUsers() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/users");

      if (this.state.users === null && response.data) {
        // make API call every 1s to get Updated User List.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getUsers, 1000);
      }

      // only show Users that are online
      const filtered_users = response.data.filter(function(user) {
        user = new User(user);
        return user.status === "ONLINE";
      });

      // Get the returned users and update the state.
      this.setState({ users: filtered_users, error: null });
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    clearInterval(this.interval);
  }

  render() {
    return (
      <Box title="Online">
        <MessageHandler
          success={false}
          show={this.state.error}
          message={this.state.error}
        />
        {!this.state.users ? (
          !this.state.error && <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id}>
                    <Player user={user} />
                  </PlayerContainer>
                );
              })}
            </Users>
          </div>
        )}
      </Box>
    );
  }
}

export default OnlineUsers;
