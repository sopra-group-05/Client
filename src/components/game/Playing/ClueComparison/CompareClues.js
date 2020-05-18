import React from "react";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import {
  Button,
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";
import styled from "styled-components";
import Countdown from "../../../../views/Countdown";
import { api, handleError } from "../../../../helpers/api";
import MysteryCard from "../ChoosingMysteryWord/MysteryCard";
import { Spinner } from "../../../../views/design/Spinner";
import MessageHandler from "../../../../views/MessageHandler";

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

const ClueReview = styled.div`
  width: 70%;
`;

const ClueContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  padding: 1rem;
  margin-left: 1rem;
`;

class CompareClues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clues: [],
      submitted: false,
      cluesToFlag: [],
      waiting: true,
      error: null
    };

    this.getClues = this.getClues.bind(this);
    this.flagClue = this.flagClue.bind(this);
    this.submitClues = this.submitClues.bind(this);
  }

  async getClues() {
    try {
      const lobby = new Lobby(this.props.l);
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies/" + lobby.id + "/clues");
      this.setState({ clues: response.data, waiting: false, error: null });
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 500 || error.response.status === 400)
      ) {
        this.setState({ waiting: true, error: "" });
        setTimeout(this.getClues, 1000);
      } else {
        this.setState({
          error:
            error && error.response
              ? error.response.data
              : error && error.message
              ? error.message
              : "Unknown error"
        });
        console.log(
          `Something went wrong while fetching the clues: \n${handleError(
            error
          )}`
        );
      }
    }
  }

  flagClue(clueId) {
    if (this.state.cluesToFlag.includes(clueId)) {
      let newArray = this.state.cluesToFlag.filter(item => item !== clueId);
      this.setState({ cluesToFlag: newArray });
    } else {
      this.setState({ cluesToFlag: [clueId].concat(this.state.cluesToFlag) });
    }
  }

  async submitClues() {
    this.setState({ submitted: true });

    try {
      // make POST request to Server to choose Number
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      await api.put(
        "/lobbies/" + this.props.l.id + "/clues/flag",
        this.state.cluesToFlag
      );
      this.setState({ error: "" });
    } catch (error) {
      this.setState({
        error: error.response ? error.response.status : "unknown error"
      });
    }
  }

  componentDidMount() {
    this.getClues();
  }

  render() {
    const lobby = new Lobby(this.state.lobby); //transform input into Lobby Model
    const clues = this.state.clues;
    return (
      <PlayingWrapper
        headerText={
          this.state.waiting &&
          "Waiting for other Players to submit their clues..."
        }
      >
        <PlayingTitle>Reviewing Clues</PlayingTitle>
        <PlayingDescription>
          If you think any of the following Clues does not follow the game rules
          then please remove the tick. If enough Players remove the tick of the
          Clue, it will be disabled!
        </PlayingDescription>
        <Container>
          <MysteryCard lobbyLanguage={lobby.language} lobbyId={lobby.id} />
          <ClueReview>
            {clues && clues.length > 0 ? (
              <Form>
                {clues.map(clue => (
                  <ClueContainer>
                    <ClueStatus onClick={() => this.flagClue(clue.id)}>
                      <CheckBox>
                        <CheckboxTick
                          checked={!this.state.cluesToFlag.includes(clue.id)}
                        />
                      </CheckBox>
                      {clue.hint}
                    </ClueStatus>
                  </ClueContainer>
                ))}
                <Button
                  disabled={!clues || this.state.submitted || this.state.error}
                  onClick={() => {
                    this.submitClues();
                  }}
                >
                  Send
                </Button>
                {!this.state.submitted && !this.state.waiting && (
                  <Countdown functionWhenDone={this.submitClues} time={30} />
                )}
              </Form>
            ) : (
              <Spinner />
            )}
          </ClueReview>
        </Container>
        <MessageHandler show={this.state.error} message={this.state.error} />
      </PlayingWrapper>
    );
  }
}

export default withRouter(CompareClues);
