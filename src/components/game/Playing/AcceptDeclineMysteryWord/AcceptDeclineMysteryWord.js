import React from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";
import WaitingToAcceptDeclineMysteryWord from "./WaitingToAcceptDeclineMysteryWord";
import MysteryCard from "../ChoosingMysteryWord/MysteryCard";
import Countdown from "../../../../views/Countdown";
import { api } from "../../../../helpers/api";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Form = styled.div`
  padding: 1rem;
  margin-left: 1rem;
`;

const AcceptDeclineMysteryWord = ({ lobby, isGuesser }) => {
  const [submitted, setSubmitted] = React.useState(false);

  const makeRequest = async acceptWord => {
    if (!submitted) {
      // only allow request when not yet submitted or there was an error.
      setSubmitted(true);
      try {
        // make POST request to Server to accept or decline mystery word
        api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
        if (acceptWord) {
          console.log(acceptWord + " accepting word");
          await api.post("/lobbies/" + lobby.id + "/acceptword");
        } else {
          console.log(acceptWord + " declining word");
          await api.post("/lobbies/" + lobby.id + "/declineword");
        }
      } catch (error) {
        console.log(error.response ? error.response : "Unknown error");
        setSubmitted(false);
      }
    }
  };

  if (isGuesser) {
    return <WaitingToAcceptDeclineMysteryWord />;
  } else {
    return (
      <PlayingWrapper>
        <PlayingTitle>Accept or decline the Mystery Word.</PlayingTitle>
        <PlayingDescription>
          Here you can see which word was chosen by the active player. Do you
          accept this word?
        </PlayingDescription>
        <Container>
          <MysteryCard lobbyLanguage={lobby.language} lobbyId={lobby.id} />
          <Form>
            <Button
              disabled={submitted}
              onClick={() => {
                makeRequest(true);
              }}
            >
              Accept
            </Button>
            <Button
              disabled={submitted}
              onClick={() => {
                makeRequest(false);
              }}
            >
              Decline
            </Button>
            {!submitted && (
              <Countdown functionWhenDone={() => makeRequest(true)} time={30} />
            )}
          </Form>
        </Container>
      </PlayingWrapper>
    );
  }
};

export default withRouter(AcceptDeclineMysteryWord);
