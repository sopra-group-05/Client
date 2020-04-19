import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { withRouter } from "react-router-dom";

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

class PlayerInOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.player,
      lobby: this.props.lobby,
      creator: this.props.lobby.creator,
      error: null
    };
  }

  render() {
    return (
      <Container>
        <Avatar size={40} user={this.state.player} />
        <PlayerMeta>
          <PlayerName>{this.state.player.username}</PlayerName>
          <PlayerInfo>
            {this.state.player.role} | {this.state.player.status}
          </PlayerInfo>
        </PlayerMeta>
      </Container>
    );
  }
}

export default withRouter(PlayerInOverview);
