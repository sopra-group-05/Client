import { withRouter } from "react-router-dom";
import ChoosingMysteryWord from "./ChoosingMysteryWord/ChoosingMysteryWord";
import WritingClues from "./WritingClues/WritingClues";
import Guess from "./Guess/Guess";
import React from "react";

const PlayingLogic = ({ state, nextState, lobby, isGuesser }) => {
  // this component renders the correct state of the game
  const states = [ChoosingMysteryWord, WritingClues, Guess]; // add your views at correct position
  state = state % states.length;
  const Component = states[state];
  // todo: make some kind of if statement to switch between number, clues etc by the status of the LOBBY!
  // todo: this is just to show how it would look like when the API works.
  return (
    <Component lobby={lobby} isGuesser={isGuesser} nextState={nextState} />
  );
};

export default withRouter(PlayingLogic);
