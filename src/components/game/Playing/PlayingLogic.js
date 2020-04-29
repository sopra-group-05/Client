import { withRouter } from "react-router-dom";
import ChoosingMysteryWord from "./ChoosingMysteryWord/ChoosingMysteryWord";
import WritingClues from "./WritingClues/WritingClues";
import ClueComparison from "./ClueComparison/ClueComparison";
import Guess from "./Guess/Guess";
import React from "react";
import EndRound from "./EndRound/EndRound";
import Lobby from "../../shared/models/Lobby";

const PlayingLogic = ({ state, nextState, lobby, isGuesser }) => {
  // this component renders the correct state of the game
  const states = [
    ChoosingMysteryWord,
    WritingClues,
    ClueComparison,
    Guess,
    EndRound
  ]; // add your views at correct position

  lobby = new Lobby(lobby);
  if (lobby.players.some(player => player.status === "PICKING_NUMBER")) {
    state = 0;
  } else if (lobby.players.some(player => player.status === "WRITING_CLUES")) {
    state = 1;
  } else {
    console.log("fallback-state!");
    state = state % states.length;
  }

  const Component = states[state];
  // todo: make some kind of if statement to switch between number, clues etc by the status of the LOBBY!
  // todo: this is just to show how it would look like when the API works.

  return (
    <Component lobby={lobby} isGuesser={isGuesser} nextState={nextState} />
  );
};

export default withRouter(PlayingLogic);
