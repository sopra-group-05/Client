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
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "#454c62"};
  border-style: ${props => (props.boarderColor ? "solid" : "none")}
  border-color: ${props =>
    props.boarderColor ? props.boarderColor : "#454c62"};
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

const PlayerInfo = styled.div`
  font-weight: lighter;
  font-size: 0.8rem;
  margin: 0 10px;
  color: #8f8f8f;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PlayerMeta = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  text-align: left;
  margin-left: 1rem;
  margin-right: 0.5rem;
`;

const StatusCycle = styled.div`
  display: flex;
  margin: 0 5px 0 0;
  background-color: green;
  border-radius: 50%;
  width: 0.75em;
  height: 0.75em;
`;

const PlayerStatus = ({ status, role }) => {
  const color =
    status == "JOINED"
      ? "blue"
      : status == "READY"
      ? "green"
      : status == "FINISHED"
      ? "orange"
      : status == "PICKING_NUMBER"
      ? "blue"
      : status == "ACCEPTING_MYSTERY_WORD"
      ? "yellow"
      : status == "WAITING_TO_ACCEPT_MYSTERY_WORD"
      ? "yellow"
      : status == "WAITING_FOR_NUMBER"
      ? "yellow"
      : status == "WAITING_FOR_CLUES"
      ? "yellow"
      : status == "WRITING_CLUES"
      ? "yellow"
      : status == "WAITING_FOR_REVIEW"
      ? "yellow"
      : status == "REVIEWING_CLUES"
      ? "blue"
      : status == "GUESSING_WORD"
      ? "blue"
      : status == "WAITING_FOR_GUESS"
      ? "yellow"
      : status == "END_OF_TURN"
      ? "orange"
      : status == "PLAYER_LEFT"
      ? "orange"
      : "pink";

  const statusOutput =
    status == "JOINED"
      ? "Joined"
      : status == "READY"
      ? "Ready"
      : status == "FINISHED"
      ? "Finished"
      : status == "PICKING_NUMBER"
      ? "Picking a Number"
      : status == "WAITING_FOR_NUMBER"
      ? "Waiting for a Number"
      : status == "ACCEPTING_MYSTERY_WORD"
      ? "Voting on Mystery Word"
      : status == "WAITING_TO_ACCEPT_MYSTERY_WORD"
      ? "Waiting on Voting"
      : status == "WAITING_FOR_CLUES"
      ? "Waiting for Clues"
      : status == "WRITING_CLUES"
      ? "Writing a Clue"
      : status == "WAITING_FOR_REVIEW"
      ? "Waiting for Clue been reviewed"
      : status == "REVIEWING_CLUES"
      ? "Reviewing Clues"
      : status == "GUESSING_WORD"
      ? "Guessing..."
      : status == "WAITING_FOR_GUESS"
      ? "Waiting for the Guess"
      : status == "END_OF_TURN"
      ? "End of Turn"
      : status == "PLAYER_LEFT"
      ? "A Player has left"
      : "wtf?!";

  const playerRole =
    role == "GUESSER"
      ? "GUESSER"
      : role == "CLUE_CREATOR"
      ? "CLUE CREATOR"
      : "WHO AM I?";

  return (
    <PlayerInfo>
      <StatusCycle
        style={{
          backgroundColor: color
        }}
      />{" "}
      {playerRole} | {statusOutput}
    </PlayerInfo>
  );
};

class PlayerInOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  render() {
    const boarderColor = this.props.player.role == "GUESSER" ? "yellow" : "";
    const containerColor =
      this.props.player.id == localStorage.getItem("userId")
        ? "rgba(0, 0, 0, 0.3)"
        : "";

    return (
      <Container boarderColor={boarderColor} backgroundColor={containerColor}>
        <Avatar size={40} user={this.props.player} />
        <PlayerMeta>
          <PlayerName>{this.props.player.username}</PlayerName>
          <PlayerStatus
            role={this.props.player.role}
            status={this.props.player.status}
          />
        </PlayerMeta>
      </Container>
    );
  }
}

export default withRouter(PlayerInOverview);
