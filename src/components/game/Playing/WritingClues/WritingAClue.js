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

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Form = styled.div`
  padding: 1rem;
  margin-left: 1rem;
`;

const WritingAClue = ({ l, nextState }) => {
  const lobby = new Lobby(l); //transform input into Lobby Model
  const [clue, setClue] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const handleInputChange = (key, input) => {
    setClue(input);
  };
  const submitClue = async () => {
    setSubmitted(true);
    try {
      const requestBody = JSON.stringify({
        hint: clue
      });

      // make POST request to Server to choose Number
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      await api.post("/lobbies/" + lobby.id + "/clues", requestBody);
    } catch (error) {
      console.log(error);
      // todo remove once API Endpoint works
      alert("There was an error, see console and network log in your browser.");
    }
  };

  return (
    <PlayingWrapper headerText={submitted && "Waiting for other players"}>
      <PlayingTitle>Writing Clues</PlayingTitle>
      <PlayingDescription>
        {submitted
          ? "You would submit the clue " + clue + " to the server."
          : "Try tp come up with a hint for the mystery word!"}
      </PlayingDescription>
      <Container>
        <MysteryCard lobbyId={lobby.id} />
        <Form>
          <TextInput
            disabled={submitted}
            field="clue"
            label="Your Clue"
            state={clue}
            labelAlign={"left"}
            handleChange={handleInputChange}
          />
          <Button
            disabled={!clue || submitted}
            onClick={() => {
              submitClue();
            }}
          >
            Send
          </Button>
          {!submitted && <Countdown functionWhenDone={submitClue} time={30} />}
        </Form>
      </Container>
    </PlayingWrapper>
  );
};

export default withRouter(WritingAClue);
