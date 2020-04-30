import React from "react";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper,
  Button
} from "../PlayingStyle";
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

const Guessing = ({ l }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  const [guess, setGuess] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleInputChange = (key, input) => {
    setGuess(input);
    checkGuessForError(input);
  };
  const submitGuess = async () => {
    setSubmitted(true);
    try {
      const requestBody = JSON.stringify({
        guess: guess
      });

      // make POST request to Server to choose Number
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      await api.post("/lobbies/" + lobby.id + "/guess", requestBody);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  const skipGuess = () => {
    // set guess to empty and submit it.
    setGuess("");
    submitGuess();
  };

  const checkGuessForError = clue => {
    if (clue.match(/(\s)/g)) {
      setError("The Guess should consist of one word (no white spaces)");
    } else {
      setError("");
    }
  };

  return (
    <PlayingWrapper
      headerText={
        submitted && "You would submit the guess " + guess + " to the server."
      }
    >
      <PlayingTitle>Guess the Mystery Word</PlayingTitle>
      <PlayingDescription>Try to guess the mystery word!</PlayingDescription>
      <Container>
        <p>This is where the clues would be displayed.</p>
        <Form>
          <TextInput
            disabled={submitted}
            field="guess"
            label="Your guess"
            state={guess}
            labelAlign={"left"}
            handleChange={handleInputChange}
          />
          <Button
            disabled={!guess || submitted || error}
            onClick={() => {
              submitGuess();
            }}
          >
            Guess
          </Button>
          <Button
            disabled={submitted}
            onClick={() => {
              skipGuess();
            }}
          >
            Skip
          </Button>
          {!submitted && <Countdown functionWhenDone={skipGuess} time={30} />}
        </Form>
      </Container>
      <MessageHandler message={error} show={error} />
    </PlayingWrapper>
  );
};

export default withRouter(Guessing);
