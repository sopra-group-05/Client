import React from "react";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";
import styled from "styled-components";
import Countdown from "../../../../views/Countdown";
import { api, handleError } from "../../../../helpers/api";
import ClueView from "../ClueView";
import MysteryCard from "../ChoosingMysteryWord/MysteryCard";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ClueContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class CompareClues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      l: this.props.l,
      nextState: this.props.nextState,
      clues: ["Clue1", "Clue2"], //TODO: empty when rest works
      error: null
    };
    this.getClues = this.getClues.bind(this);
  }

  async getClues() {
    try {
      const lobby = new Lobby(this.state.l);

      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies/" + lobby.id + "/clues");
      console.log(response);

      if (this.state.lobby === null && response.data) {
        // make API call every 1s to get Updated lobbies List.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobbyStatus, 1000);
      }

      this.setState({ clues: response.data, error: null });
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while fetching the clues: \n${handleError(error)}`
      );
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.getClues();
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    clearInterval(this.interval);
  }

  render() {
    const lobby = new Lobby(this.state.l); //transform input into Lobby Model
    const clues = this.state.clues;
    return (
      <PlayingWrapper headerText="Choose clues to remove! ">
        <PlayingTitle>Teammate</PlayingTitle>
        <PlayingDescription>
          You will choose which clues to remove from the following list!
        </PlayingDescription>
        <Container>
          <React.Fragment>
            <MysteryCard />
          </React.Fragment>
          <ClueContainer>
            {clues.map(clue => {
              return <ClueView lobby={lobby} clue={clue} />;
            })}
          </ClueContainer>
        </Container>
        <Countdown time={30} functionWhenDone={this.state.nextState} />
      </PlayingWrapper>
    );
  }
}

export default withRouter(CompareClues);
