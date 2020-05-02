import React from "react";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper,
  Button
} from "../PlayingStyle";
import MysteryCard from "../ChoosingMysteryWord/MysteryCard";
import styled from "styled-components";
import { api } from "../../../../helpers/api";
import MessageHandler from "../../../../views/MessageHandler";
import Countdown from "../../../../views/Countdown";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Form = styled.div`
  padding: 1rem;
  margin-left: 1rem;
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

const ClueStatus = styled.div`
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: inline-flex;
  margin-bottom: 1rem;
  cursor: pointer;
`;

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

const CompareCluesVorschlag = ({ l }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  const [submitted, setSubmitted] = React.useState(false);
  const [clues, setClues] = React.useState([]);
  const [cluesToFlag, setCluesToFlag] = React.useState([]);
  const [error, setError] = React.useState("");

  const submitClues = async () => {
    setSubmitted(true);
    try {
      /*const requestBody = JSON.stringify({
        cluesToFlag: cluesToFlag
      });*/

      // make POST request to Server to choose Number
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      await api.put("/lobbies/" + lobby.id + "/clues/flag", cluesToFlag);
    } catch (error) {
      console.log(error);
      alert("There was an error, see console and network log in your browser.");
    }
  };

  const getClues = async () => {
    // get Clues
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies/" + lobby.id + "/clues");
      setClues(response.data);
    } catch (error) {
      console.log(error);
      // todo remove once API Endpoint works
      let demoClues = [
        { id: 1, hint: "test1" },
        { id: 2, hint: "test2" }
      ];
      setClues(demoClues);

      // todo only show information icon for active card
      // todo highlight active card
    }
  };

  const flagClue = clueId => {
    if (cluesToFlag.includes(clueId)) {
      let newArray = cluesToFlag.filter(item => item !== clueId);
      setCluesToFlag(newArray);
    } else {
      setCluesToFlag([clueId].concat(cluesToFlag));
    }
  };

  React.useEffect(() => {
    getClues();
  }, []);

  return (
    <PlayingWrapper>
      <PlayingTitle>Reviewing Clues</PlayingTitle>
      <PlayingDescription>
        If you think any of the following Clues does not follow the games rule
        then please remove the tick. If enough Players remove the tick of the
        Clue it will be disabled!
      </PlayingDescription>
      <Container>
        <MysteryCard lobbyLanguage={lobby.language} lobbyId={lobby.id} />
        <ClueReview>
          <Form>
            {clues.map(clue => (
              <ClueContainer>
                <ClueStatus onClick={() => flagClue(clue.id)}>
                  <CheckBox>
                    <CheckboxTick checked={!cluesToFlag.includes(clue.id)} />
                  </CheckBox>
                  {clue.hint}
                </ClueStatus>
              </ClueContainer>
            ))}
            <Button
              disabled={!clues || submitted || error}
              onClick={() => {
                submitClues();
              }}
            >
              Send
            </Button>
            {!submitted && (
              <Countdown functionWhenDone={submitClues} time={30} />
            )}
          </Form>
        </ClueReview>
      </Container>
      <MessageHandler show={error} message={error} />
    </PlayingWrapper>
  );
};

export default withRouter(CompareCluesVorschlag);
