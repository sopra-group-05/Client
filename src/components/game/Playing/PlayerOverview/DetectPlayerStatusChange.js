import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Paragraph = styled.p`
  font-size: 1.2rem;
  color: red;
`;

const DetectPlayerStatusChange = ({ lobby }) => {
  const [message, setMessage] = useState("");
  const getOwnPlayerStatus = lobby => {
    // returns Status of this Player
    if (lobby) {
      let player = lobby.players.find(
        player => player.id == localStorage.getItem("userId")
      );
      return player.status;
    }
    return "";
  };
  const wordWasDeclined = () => {
    // sets message to be displayed
    if (
      (status == "PICKING_NUMBER" &&
        prevStatus == "WAITING_TO_ACCEPT_MYSTERY_WORD") ||
      (status == "WAITING_FOR_NUMBER" &&
        (prevStatus == "ACCEPTING_MYSTERY_WORD" ||
          prevStatus == "WAITING_TO_ACCEPT_MYSTERY_WORD"))
    ) {
      if (!message) {
        setMessage(
          "The Mystery Word was not accepted. Another number will be chosen by the active player."
        );
        setTimeout(() => setMessage(""), 5000);
        // set Timeout to delete message after 5s
      }
    }
  };

  const status = getOwnPlayerStatus(lobby);
  const prevStatus = usePrevious(status);
  wordWasDeclined();

  return <Paragraph>{message && "Info: " + message}</Paragraph>;
};

export default DetectPlayerStatusChange;
