import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import german from "../images/lang_DE.png";
import english from "../images/lang_EN.png"
import { withRouter } from "react-router-dom";
import {api} from "../helpers/api";

const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  background-color: rgba(100,100,200,0.5);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
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

const Info = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
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
  width: 1em;
  height: 1em;
`;

const Language = styled.img`
    border-radius: 50%;
    width: ${props => props.size + "px"};
    height: ${props => props.size + "px"};
    padding: ${props => (props.padding ? "1rem" : "0")};
    flex-grow: 0;
    flex-shrink: 0;
`;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const DetectPlayerStatusChange = ({ lobby, getGameInfo }) => {
  const [message, setMessage] = useState("");
  const getOwnPlayerStatus = lobby => {
    // returns Status of this Player
    if (lobby) {
      let player = lobby.players.find(
          player => player.id == localStorage.getItem("userId")
      );
      return player.status;
    }
    return "";
  };
  const updateRoundInfo = () => {
    if ((status == "PICKING_NUMBER" || status == "WAITING_FOR_NUMBER") && prevStatus == "READY")
    { getGameInfo() }
  };

  const status = getOwnPlayerStatus(lobby);
  const prevStatus = usePrevious(status);
  updateRoundInfo();
  return null;
};

class GameInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      leftCards: this.props.lobby.numberOfCards
    };
    this.getGameInfo = this.getGameInfo.bind(this);
  }

  async getGameInfo() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get(
          "/lobbies/" + this.props.lobby.id + "/game"
      );
      // Get number of leftCards
      this.setState({leftCards: response.data.leftCards
      });

    } catch (error) {
      console.log(error);
    }
  }
  
  componentDidMount()
  {
	  this.getGameInfo();
  }

  render() {
    const language = this.props.lobby.language == "DE" ? german : english;
    const cardOutput = "#Cards: " + this.props.lobby.numberOfCards;
    const roundOutput = "Round: " + (this.props.lobby.numberOfCards - this.state.leftCards + 1) + "/" + this.props.lobby.numberOfCards;
    const cardsOrRounds = this.props.cards ? cardOutput : roundOutput;
    return (
      <Container>
        <DetectPlayerStatusChange lobby = {this.props.lobby} getGameInfo={this.getGameInfo}/>
        <Language size={40} src={language} />
        <PlayerMeta>
          <Info>{cardsOrRounds}</Info>
          <PlayerInfo>#Players: {this.props.lobby.players ? this.props.lobby.players.length : "1"}/7 |{" "}
          Bots: {this.props.lobby.gameMode === "HUMANS" ? "No Bots" : "With Bots"}</PlayerInfo>
        </PlayerMeta>
      </Container>
    );
  }
}

export default withRouter(GameInfo);
