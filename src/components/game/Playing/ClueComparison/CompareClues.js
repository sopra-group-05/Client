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

const CheckBox = styled.div`
  height: 25px;
  width: 25px;
  background: #353a49;
  border-radius: 25%;
  display: block;
  margin-right: 0.75rem;
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

const ClueStatus = styled.div`
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: inline-flex;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Clues = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ClueContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

let exampleClues = [
  { id: 1, status: 0, word: "test1" },
  { id: 2, status: 1, word: "test2" }
];

class CompareClues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      l: this.props.l,
      nextState: this.props.nextState,
      clues: exampleClues, //TODO: empty when rest works
      error: null
    };
    this.getClues = this.getClues.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
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

  async toggleCheckbox(clue) {
    const previousStatus = clue.status; // TODO: cf data structure
    try {
      // set clue status via put request
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put(
        "/lobbies/" + this.state.l.id + "/clues/" + clue.id
      );
      console.log(response);
      clue.status = previousStatus === 0 ? 1 : 0;
    } catch (error) {
      this.setState({
        error: error ? error.message : "Unknown error",
        playerStatus: previousStatus
      });
      console.log(
        `Something went wrong while setting clue status: \n${handleError(
          error
        )}`
      );
    }
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
          <Clues>
            {
              // TODO: clue data structure how cf key=clue.id
            }
            {clues.map(clue => {
              return (
                <ClueContainer clue={clue}>
                  <ClueStatus onClick={() => this.toggleCheckbox(clue)}>
                    <CheckBox>
                      <CheckboxTick checked={clue.status === 1} />
                    </CheckBox>
                    {clue.word}
                  </ClueStatus>
                </ClueContainer>
              );
            })}
          </Clues>
        </Container>
        <Countdown time={30} functionWhenDone={this.state.nextState} />
      </PlayingWrapper>
    );
  }
}

export default withRouter(CompareClues);
