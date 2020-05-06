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
import TextInput from "../../../../views/design/TextInput";
import Countdown from "../../../../views/Countdown";
import { api } from "../../../../helpers/api";
import MessageHandler from "../../../../views/MessageHandler";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Form = styled.div`
  padding: 1rem;
  margin-left: 1rem;
`;

const WritingAClue = ({ l }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  const [clue, setClue] = React.useState("");
  const [secondClue, setSecondClue] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");
  const [clueTypeError, setClueTypeError] = React.useState(false);
  const handleClueChange = (key, input) => {
    setClue(input);
    checkClueForError(input);
  };
  const handleSecondClueChange = (key, input) => {
    setSecondClue(input);
    checkClueForError(input);
  };
  const submitClue = async () => {
    setSubmitted(true);
    try {
      let requestBody = JSON.stringify({
        hint: clue
      });
      if (lobby.players.length === 3) {
        // send two clues if there are exactly 3 players in the lobby.
        requestBody = JSON.stringify({
          hint: clue,
          hint2: secondClue
        });
      }

      // make POST request to Server to choose Number
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      await api.post("/lobbies/" + lobby.id + "/clues", requestBody);
    } catch (error) {
      console.log(error.response ? error.response : "Unknown error");
      setError("There was an error with your clue. Try again");
      setClue("");
      setSubmitted(false);
    }
  };

  const skipClue = () => {
    // set Clue(s) empty and submit it.
    setClue("");
    setSecondClue("");
    submitClue();
  };

  const checkClueForError = clue => {
    if (clue.match(/(\s)/g)) {
      setClueTypeError(true);
      setError("The Clue should consist of one word (no white spaces)");
    } else {
      setError("");
      setClueTypeError(false);
    }
  };

  return (
    <PlayingWrapper headerText={submitted && "Waiting for other players"}>
      <PlayingTitle>Writing Clues</PlayingTitle>
      <PlayingDescription>
        Try up come up with a hint for the mystery word!
      </PlayingDescription>
      <Container>
        <MysteryCard lobbyLanguage={lobby.language} lobbyId={lobby.id} />
        <Form>
          <TextInput
            disabled={submitted}
            field="clue"
            label="Your Clue"
            state={clue}
            labelAlign={"left"}
            handleChange={handleClueChange}
          />
          {lobby.players.length === 3 && (
            <TextInput
              disabled={submitted}
              field="secondClue"
              label="Your second Clue"
              state={secondClue}
              labelAlign={"left"}
              handleChange={handleSecondClueChange}
            />
          )}
          <Button
            disabled={(!clue && !secondClue) || submitted || clueTypeError}
            onClick={() => {
              submitClue();
            }}
          >
            Send
          </Button>
          {!submitted && <Countdown functionWhenDone={skipClue} time={30} />}
        </Form>
      </Container>
      <MessageHandler message={error} show={error} />
    </PlayingWrapper>
  );
};

export default withRouter(WritingAClue);
