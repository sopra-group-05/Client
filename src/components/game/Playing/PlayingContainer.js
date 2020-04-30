import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../../helpers/layout";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import PlayerOverview from "./PlayerOverview/PlayerOverview";
import { Spinner } from "../../../views/design/Spinner";
import { Button } from "./PlayingStyle";
import PlayingLogic from "./PlayingLogic";
import RuleContainer from "./RuleContainer";

const Container = styled(BaseContainer)`
  padding-left: 3rem;
  color: black;
  text-align: center;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
`;

const MetaInfo = styled.div`
  //padding-left: 3rem;
  color: black;
  text-align: center;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`;

class PlayingContainer extends React.Component {
  intervalID;

  constructor(props) {
    super(props);
    this.state = {
      lobby: null,
      error: null,
      dummyState: 0,
      rulesShown: false
    };
    this.getLobbyStatus = this.getLobbyStatus.bind(this);
    this.nextState = this.nextState.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.showRules = this.showRules.bind(this);
    this.toggleShowRules = this.toggleShowRules.bind(this);
  }

  getLobbyStatus = async () => {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies/" + this.props.match.params.id);

      // make a new call to the lobby to update data in 1s
      this.intervalID = setTimeout(this.getLobbyStatus, 1000);

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
      clearTimeout(this.intervalID);
    }
  };

  async leaveGame() {
    try {
      // lets player leave via put request
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put(
        "/lobbies/" + this.state.lobby.id + "/leave"
      );
      console.log(response);
      clearTimeout(this.intervalID);
      this.props.history.push("/game");
    } catch (error) {
      this.setState({
        error: error ? error.message : "Unknown error"
      });
      console.log(
        `Something went wrong while leaving: \n${handleError(error)}`
      );
    }
  }

  componentDidMount() {
    this.getLobbyStatus();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  nextState() {
    this.setState({ dummyState: this.state.dummyState + 1 });
  }

  isGuesser(playerList) {
    // checks if logged in user is active player
    const player = playerList.find(x => x.id == localStorage.getItem("userId"));
    return player.role === "GUESSER";
  }

  toggleShowRules = () => {
    this.setState({ rulesShown: !this.state.rulesShown });
  };

  showRules() {
    this.props.history.push("/game/rules");
  }

  // TODO: potential redirect to /gameover or other solution

  render() {
    return (
      <React.Fragment>
        <Sidebar disabled={true} />
        <Container>
          {this.state.lobby ? (
            <React.Fragment>
              <PlayingLogic
                nextState={this.nextState}
                state={this.state.dummyState}
                lobby={this.state.lobby}
                isGuesser={this.isGuesser(this.state.lobby.players)}
              />
              <MetaInfo>
                <PlayerOverview
                  l={this.state.lobby}
                  leaveGame={this.leaveGame}
                  toggleShowRules={this.toggleShowRules}
                />
                <RuleContainer
                  l={this.state.lobby}
                  isShown={this.state.rulesShown}
                  showRules={this.showRules}
                />
              </MetaInfo>
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
            disabled={true}
          >
            Preview next State
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(PlayingContainer);
