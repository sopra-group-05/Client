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

const BotName = styled.p`
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

const BotInfo = styled.p`
  font-weight: lighter;
  font-size: 0.8rem;
  margin: 0 10px;
  color: #8f8f8f;
`;

const BotMeta = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  text-align: left;
  margin-left: 1rem;
  margin-right: 0.5rem;
`;

class BotInLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      botName: this.props.botName
    };
  }

  render() {
    const botMessage =
      this.props.numberOfBots == 1
        ? "1 Bot is happy to join"
        : this.props.numberOfBots + " Bots are happy to join";
    return (
      <Container>
        <Avatar size={40} user={this.state.botName} />
        <BotMeta>
          <BotName>{botMessage}</BotName>
          <BotInfo>CLUE_CREATOR | is ready</BotInfo>
        </BotMeta>
      </Container>
    );
  }
}

export default withRouter(BotInLobby);
