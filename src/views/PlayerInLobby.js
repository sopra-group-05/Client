import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import DeleteIcon from "../images/delete.png"
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
  margin: 10px;
  padding: 0;
  color: #fff;
  min-width: 50px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-top: 1rem;
`;

const IconPlaceholder = styled.div`
  width: 25px;
  height: 25px;
  margin-top: 1rem;
`;

const PlayerInfo = styled.p`
  font-weight: lighter;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  color: #8f8f8f;
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

  async removePlayerFromLobby(){
    console.log("removePlayerFromLobby was run with lobby id " + this.state.lobby.id);
    try {
      // kick player via put request
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put("/lobbies/" + this.state.lobby.id + "/kick/" + this.state.player.id);
      console.log(response);

    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while kicking the player: \n${handleError(error)}`
      );
    }
  }

  render() {
    const kickPlayer = (this.state.creator.id == localStorage.getItem("userId"))?
      <Icon src={DeleteIcon} onClick={()=>this.removePlayerFromLobby()}/>:
      <IconPlaceholder/>;
    return (
      <Container>
        <Avatar size={40} user={this.state.player}/>
        <PlayerName>{this.state.player.username}</PlayerName>
        {kickPlayer}
      </Container>
    );
  }
}

export default withRouter(PlayerInLobby);
