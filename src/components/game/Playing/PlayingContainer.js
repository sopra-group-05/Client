import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../../helpers/layout";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import PlayerOverview from "./PlayerOverview/PlayerOverview";
import { Spinner } from "../../../views/design/Spinner";
import ChoosingMysteryWord from "./ChoosingMysteryWord/ChoosingMysteryWord";
import WritingClues from "./WritingClues/WritingClues";
import { Button } from "./PlayingStyle";

const Container = styled(BaseContainer)`
  padding-left: 3rem;
  color: black;
  text-align: center;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
`;

class PlayingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: null,
      error: null,
      dummyState: 0
    };
    this.getLobbyStatus = this.getLobbyStatus.bind(this);
  }

  async getLobbyStatus() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies/" + this.props.match.params.id);

      if (this.state.lobby === null && response.data) {
        // make API call every 1s to get Updated lobbies List.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobbyStatus, 1000);
      }

      // Get the returned lobby and update the state.
      this.setState({ lobby: response.data, error: null });
      //console.log(response);
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
    this.getLobbyStatus();
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    clearInterval(this.interval);
  }

  nextState() {
    const newState = this.state.dummyState < 1 ? this.state.dummyState + 1 : 0;
    this.setState({ dummyState: newState });
  }

  isGuesser(playerList) {
    // checks if logged in user is active player
    const player = playerList.find(x => x.id == localStorage.getItem("userId"));
    return player.role === "GUESSER";
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar disabled={true} />
        <Container>
          {this.state.lobby ? (
            <React.Fragment>
              {// todo: make some kind of if statement to switch between number, clues etc by the status of the LOBBY!
              this.state.dummyState === 0 ? (
                <ChoosingMysteryWord
                  lobby={this.state.lobby}
                  isGuesser={this.isGuesser(this.state.lobby.players)}
                />
              ) : (
                <WritingClues
                  lobby={this.state.lobby}
                  isGuesser={this.isGuesser(this.state.lobby.players)}
                />
              )}
              <PlayerOverview l={this.state.lobby} />
            </React.Fragment>
          ) : (
            <Spinner />
          )}
        </Container>
        <Container>
          <Button
            onClick={() => {
              this.nextState();
            }}
          >
            Preview next State
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(PlayingContainer);
