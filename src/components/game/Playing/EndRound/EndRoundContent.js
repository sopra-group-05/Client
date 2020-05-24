import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { api, handleError } from "../../../../helpers/api";
import { Spinner } from "../../../../views/design/Spinner";
import { Button, PlayingDescription } from "../PlayingStyle";
import Lobby from "../../../shared/models/Lobby";
import Countdown from "../../../../views/Countdown";

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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const CheckboxTick = styled.div`
  visibility: ${props => (props.checked ? "visible" : "hidden")};
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 25%;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(45deg);
  :before {
    content: "";
    position: absolute;
    width: 5px;
    height: 12px;
    background-color: #3bff65;
    left: 12px;
    top: 6px;
  }
  :after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #3bff65;
    left: 8px;
    top: 13px;
  }
`;

const CheckBox = styled.div`
  height: 25px;
  width: 25px;
  background: #353a49;
  border-radius: 25%;
  display: block;
  margin-right: 0.75rem;
`;

const PlayerStatus = styled.div`
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: inline-flex;
  cursor: pointer;
`;

const NextRoundButton = styled(Button)`
  padding: 1rem;
  margin-top: 0;
`;

const ButtonSpacer = styled.div`
  width: 5em;
`;

const GuessDescription = styled(PlayingDescription)`
  color: ${props => (props.color ? props.color : "yellow")};
`;

const OutputText = ({ user, success, playerLeft, guess, mysteryWord }) => {
  if (playerLeft === "true") {
    return (
      <GuessDescription color={"yellow"}>
        A player has left the game!! <br />
        The actual round is cancelled and the rest of the players can continue.
      </GuessDescription>
    );
  } else {
    if (guess === "") {
      return (
        <GuessDescription color={"#00a5ee"}>
          {user} had no idea what the mystery word was!! <br />
          The searched mystery word was {mysteryWord}!!
        </GuessDescription>
      );
    } else {
      if (success) {
        return (
          <GuessDescription color={"#39b346"}>
            {user}s guess was {guess} and this guess was correct!!
          </GuessDescription>
        );
      } else {
        return (
          <GuessDescription color={"#ee232b"}>
            {user}s guess was {guess} and this guess was wrong!! <br />
            The searched mystery word was {mysteryWord}!!
          </GuessDescription>
        );
      }
    }
  }
};

class EndRoundContent extends React.Component {
  constructor() {
    super();
    this.state = {
      guess: null,
      mysteryWord: "",
      success: false,
      successWord: "",
      textColor: null,
      leftCards: 0,
      wonCards: 0,
      lostCards: 0,
      playersReady: false,
      playerStatus: false,
      playerHasLeft: false
    };
    this.getLobbyguess = this.getLobbyguess.bind(this);
    this.setReady = this.setReady.bind(this);
  }

  async getLobbyguess() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get(
        "/lobbies/" + this.props.lobby.id + "/game"
      );
      // Get the returned mysteryCard and update the state.
      this.setState({
        guess: response.data.guess,
        success: response.data.success,
        leftCards: response.data.leftCards,
        wonCards: response.data.wonCards,
        lostCards: response.data.lostCards,
        mysteryWord: response.data.mysteryWord
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

  async nextRound() {
    console.log("Next Round");
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put(
        "/lobbies/" + this.props.lobby.id + "/nextRound"
      );
      console.log(response);
    } catch (error) {
      this.setState({
        error:
          error && error.response
            ? error.response.data
            : error && error.message
            ? error.message
            : "Unknown error"
      });
      console.log(
        `Something went wrong while starting the next round: \n${handleError(
          error
        )}`
      );
    }
  }

  getNonCreator(l) {
    let nonCreators = Array.from(l.players);
    const creator = l.creator;
    const index = nonCreators.findIndex(player => player.id === creator.id);
    nonCreators.splice(index, 1);
    return nonCreators;
  }

  playersReady(lobby) {
    // return true when lobby is ready e.g. all players have status ready and there are at least 4 players
    lobby = new Lobby(lobby);
    let allReady = true;
    lobby.players.forEach(player => {
      if (player.status != "READY") {
        allReady = false;
      }
    });
    this.setState({ playersReady: allReady });
  }

  async toggleCheckbox() {
    const previousStatus = this.state.playerStatus;
    try {
      // set player status via put request
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put(
        "/lobbies/" + this.props.lobby.id + "/ready"
      );
      console.log(response);
      this.setState({ playerStatus: true });
      this.forceUpdate();
    } catch (error) {
      this.setState({
        error:
          error && error.response
            ? error.response.data
            : error && error.message
            ? error.message
            : "Unknown error",
        playerStatus: previousStatus
      });
      console.log(
        `Something went wrong while setting player status: \n${handleError(
          error
        )}`
      );
    }
  }

  setReady() {
    let player = this.props.lobby.players.find(
      player => player.id == localStorage.getItem("userId")
    );
    if (player.status !== "READY") {
      this.toggleCheckbox();
    }
  }

  endGame() {
    this.props.history.push("/game/lobby/" + this.props.lobby.id + "/gameover");
    clearInterval(this.interval);
  }

  checkIfPlayerHasLeft(l) {
    let player = l.players.find(
      player => player.id == localStorage.getItem("userId")
    );
    if (player.status == "PLAYER_LEFT" && !localStorage.getItem("playerLeft")) {
      localStorage.setItem("playerLeft", true);
      this.setReady();
    }
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    clearInterval(this.interval);
    localStorage.removeItem("playerLeft");
  }

  componentDidMount() {
    this.getLobbyguess();
  }

  render() {
    this.checkIfPlayerHasLeft(this.props.lobby);
    return (
      <div>
        <OutputText
          user={this.props.user}
          success={this.state.success}
          playerLeft={localStorage.getItem("playerLeft")}
          guess={this.state.guess}
          mysteryWord={this.state.mysteryWord}
        />
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

        {this.state.leftCards <= 0 ? (
          <React.Fragment>
            <GuessDescription color="white">
              There are no cards left to play. The game is over now.
            </GuessDescription>
            <ButtonGroup>
              <NextRoundButton
                onClick={() => {
                  this.endGame();
                }}
                background={"#44d63f"}
              >
                Go to ranking board
              </NextRoundButton>
            </ButtonGroup>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ButtonGroup>
              {this.props.lobby.creator.id ==
                localStorage.getItem("userId") && (
                <NextRoundButton
                  onClick={() => {
                    this.nextRound();
                  }}
                  disabled={!this.props.ready}
                  background={"#44d63f"}
                >
                  Start next Round
                </NextRoundButton>
              )}
            </ButtonGroup>
            <Countdown
              activeText={"Check Score for  "}
              timeoutText={"Lobby Creator should start next round"}
              functionWhenDone={this.setReady}
              time={5}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(EndRoundContent);
