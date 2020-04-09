import React from "react";
import { withRouter } from "react-router-dom";
import Lobby from "../../../shared/models/Lobby";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";
import styled from "styled-components";

const WritingAClue = () => {
  return (
    <PlayingWrapper headerText="Waiting for Clues!">
      <PlayingTitle>Guesser</PlayingTitle>
      <PlayingDescription>Text Text</PlayingDescription>
    </PlayingWrapper>
  );
};

export default withRouter(WritingAClue);
