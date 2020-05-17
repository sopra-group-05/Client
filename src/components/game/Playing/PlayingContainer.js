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
import LeaveContainer from "./LeaveContainer";
import CancelGame from "./CancelGame/CancelGame";

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
      rulesShown: false,
      leaveShown: false,
      guess: null,
      success: false,
      cancelGame: false
    };
    this.getLobbyStatus = this.getLobbyStatus.bind(this);
    this.nextState = this.nextState.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.showRules = this.showRules.bind(this);
    this.toggleShowRules = this.toggleShowRules.bind(this);
    this.toggleLeaveGame = this.toggleLeaveGame.bind(this);
    this.goBackToDashboard = this.goBackToDashboard.bind(this);
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
    } catch (err) {
      this.setState({ error: err ? err.message : "Unknown error" });
      if(err.response.status== 404)
      {
    	  this.setState({ lobby: null, cancelGame: true})
    	  //this.intervalID = setTimeout(this.getLobbyStatus, 1000);
      }
      else
      {
    	  clearTimeout(this.intervalID);
          console.log(
        	        `Something went wrong while fetching the lobbies: \n        	        
        	        ${handleError(err)}`);
      }
      
    }
  };

  getGuess = async () => {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get(
        "/lobbies/" + this.props.match.params.id + "/guess"
      );

      // Get the returned guess and success flag.
      this.setState({ guess: response.data[0], success: response.data[1] });
      //console.log(response);
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while fetching the lobbies: \n${handleError(
          error
        )}`
      );
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
    this.setState({
      dummyState: this.state.dummyState ? this.state.dummyState + 1 : 1
    });
  }

  isGuesser(playerList) {
    // checks if logged in user is active player
    const player = playerList.find(x => x.id == localStorage.getItem("userId"));
    return player.role === "GUESSER";
  }

  toggleShowRules = () => {
    this.setState({ rulesShown: !this.state.rulesShown });
  };

  toggleLeaveGame = () => {
    this.setState({ leaveShown: !this.state.leaveShown });
  };

  showRules() {
    this.props.history.push("/game/rules");
  }
  
  goBackToDashboard() {
	this.props.history.push("/game/dashboard");
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
                  toggleLeaveGame={this.toggleLeaveGame}
                  toggleShowRules={this.toggleShowRules}
                  showHideRules={this.state.rulesShown}
                  showStay={this.state.leaveShown}
                />
                <LeaveContainer
                    isShown={this.state.leaveShown}
                    leave={this.leaveGame}
                />
                <RuleContainer
                  l={this.state.lobby}
                  isShown={this.state.rulesShown}
                  showRules={this.showRules}
                />
              </MetaInfo>
            </React.Fragment>
          ) : (<Spinner/>)}
          {this.state.cancelGame ? (<CancelGame goBackToDashboard= {this.goBackToDashboard}/>) : null}  

          
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(PlayingContainer);
