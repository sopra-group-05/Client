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

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Form = styled.div`
  padding: 1rem;
  margin-left: 1rem;
`;

const Guessing = ({ l, nextState }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  const [guess, setGuess] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const handleInputChange = (key, input) => {
    setGuess(input);
  };
  const submitGuess = () => {
    setSubmitted(true);
    //alert("You would've submitted the clue " + clue);
  };
  const skipGuess = () => {
    alert("You would've skipped this guess!");
  };
  return (
    <PlayingWrapper headerText={submitted && "Tralala for other players"}>
      <PlayingTitle>Guess the Mystery Word</PlayingTitle>
      <PlayingDescription>
        {submitted
          ? "You would submit the guess " + guess + " to the server."
          : "Try to guess the mystery word!"}
      </PlayingDescription>
      <Container>
        <p>Here come the Clues</p>
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
            disabled={!guess || submitted}
            onClick={() => {
              submitGuess();
            }}
          >
            Guess
          </Button>
          <Button
            onClick={() => {
              skipGuess();
            }}
          >
            Skip
          </Button>
          {!submitted && <Countdown functionWhenDone={nextState} time={30} />}
        </Form>
      </Container>
    </PlayingWrapper>
  );
};

export default withRouter(Guessing);
