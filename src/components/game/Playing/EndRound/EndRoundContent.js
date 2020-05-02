import React from "react";
import axios from "axios";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { api, handleError } from "../../../../helpers/api";
import { Spinner } from "../../../../views/design/Spinner";
import { PlayingDescription } from "../PlayingStyle";

const DeckOverview = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const DeckContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
`;

const DeckTitle = styled.div`
  display: flex;
  font-size: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const DeckCount = styled.span`
  font-size: 4rem;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10%;
  display: block;
  padding: 0rem 1.5rem;
  margin: 1rem;
  cursor: pointer;
  color: ${props => (props.color ? props.color : "yellow")};
`;

const GuessDescription = styled(PlayingDescription)`
  color: ${props => (props.color ? props.color : "yellow")};
`;

class EndRoundContent extends React.Component {
  constructor() {
    super();
    this.state = {
      guess: null,
      success: false,
      successWord: "",
      textColor: null,
      leftCards: 0,
      wonCards: 0,
      lostCards: 0
    };
    this.getLobbyguess = this.getLobbyguess.bind(this);
  }

  async getLobbyguess() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get(
        "/lobbies/" + this.props.match.params.id + "/guess"
      );
      // Get the returned mysteryCard and update the state.
      this.setState({
        guess: response.data.guess,
        success: response.data.success,
        leftCards: response.data.leftCards,
        wonCards: response.data.wonCards,
        lostCards: response.data.lostCards
      });

      if (this.state.success) {
        this.setState({ successWord: "correct", textColor: "#39b346" });
      } else {
        this.setState({ successWord: "wrong", textColor: "#ee232b" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getLobbyguess();
  }

  render() {
    return (
      <div>
        <GuessDescription color={this.state.textColor}>
          {this.props.user}'s guess was {this.state.guess} and this guess was{" "}
          {this.state.successWord}!!
        </GuessDescription>
        <DeckOverview>
          <DeckContainer>
            <DeckTitle> Remaining Cards in Deck </DeckTitle>
            <DeckCount color={"#00a5ee"}> {this.state.leftCards} </DeckCount>
          </DeckContainer>
          <DeckContainer>
            <DeckTitle> Won Cards </DeckTitle>
            <DeckCount color={"#39b346"}> {this.state.wonCards} </DeckCount>
          </DeckContainer>
          <DeckContainer>
            <DeckTitle> Lost Cards </DeckTitle>
            <DeckCount color={"#ee232b"}> {this.state.lostCards} </DeckCount>
          </DeckContainer>
        </DeckOverview>
      </div>
    );
  }
}

export default withRouter(EndRoundContent);
