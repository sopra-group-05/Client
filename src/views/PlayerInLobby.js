import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import DeleteIcon from "../images/delete.png";
import { withRouter } from "react-router-dom";
import { api, handleError } from "../helpers/api";

const Container = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  background-color: #454c62;
  a {
    color: #ce552e;
    display: flex;
    justify-content: left;
    align-items: center;
    min-width: 300px;
    text-decoration: none;
    margin: 0;
    padding: 0;
  }
`;

const PlayerName = styled.p`
  font-weight: bold;
  margin: 0 10px;
  color: #fff;
  min-width: 50px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-top: 1rem;
  align-self: flex-end;
`;

const IconPlaceholder = styled.div`
  width: 25px;
  height: 25px;
  margin-top: 1rem;
  align-self: flex-end;
`;

const PlayerInfo = styled.p`
  font-weight: lighter;
  font-size: 0.8rem;
  margin: 0 10px;
  color: #8f8f8f;
`;

const PlayerMeta = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  text-align: left;
  margin-left: 1rem;
  margin-right: 0.5rem;
`;

class PlayerInLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.player,
      lobby: this.props.lobby,
      creator: this.props.lobby.creator,
      error: null
    };
    this.removePlayerFromLobby = this.removePlayerFromLobby.bind(this);
  }

  async removePlayerFromLobby() {
    console.log(
      "removePlayerFromLobby was run with lobby id " + this.props.lobby.id
    );
    console.log(this.props.lobby.creator);
    console.log(localStorage.getItem("token"));
    try {
      // kick player via put request
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put(
        "/lobbies/" + this.props.lobby.id + "/kick/" + this.props.player.id
      );
      console.log(response);
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while kicking the player: \n${handleError(error)}`
      );
    }
  }

  render() {
    const kickPlayer =
      this.props.lobby.creator.id == localStorage.getItem("userId") &&
      this.props.lobby.creator.id != this.props.player.id ? (
        <Icon src={DeleteIcon} onClick={() => this.removePlayerFromLobby()} />
      ) : (
        <IconPlaceholder />
      );
    return (
      <Container>
        <Avatar size={40} user={this.props.player} />
        <PlayerMeta>
          <PlayerName>{this.props.player.username}</PlayerName>
          <PlayerInfo>
            {this.props.player.role} |
            {this.props.player.status === "READY" ? "is ready" : "not ready"}
          </PlayerInfo>
        </PlayerMeta>
        {kickPlayer}
      </Container>
    );
  }
}

export default withRouter(PlayerInLobby);
