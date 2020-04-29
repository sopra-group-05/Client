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
  const old_states = [
    ChoosingMysteryWord,
    WritingClues,
    ClueComparison,
    Guess,
    EndRound
  ]; // add your views at correct position
  let Component = ChoosingMysteryWord;
  const states = new Map();
  // set States and which Component should be rendered given the Status of a player.
  states.set("PICKING_NUMBER", ChoosingMysteryWord);
  states.set("WAITING_FOR_NUMBER", ChoosingMysteryWord);

  states.set("WAITING_FOR_CLUES", WritingClues);
  states.set("WRITING_CLUES", WritingClues);

  states.set("WAITING_FOR_REVIEW", ClueComparison);
  states.set("REVIEWING_CLUES", ClueComparison);

  // Select Component to render depending on the players OWN Status!
  lobby = new Lobby(lobby);
  let player = lobby.players.find(
    player => player.id == localStorage.getItem("userId")
  );
  Component = states.get(player.status);

  /*lobby.players.forEach(player => {
    if (states.get(player.status)) {
      Component = states.get(player.status);
    }
  });*/

  // todo: make some kind of if statement to switch between number, clues etc by the status of the LOBBY!
  // todo: this is just to show how it would look like when the API works.

  return (
    <Component lobby={lobby} isGuesser={isGuesser} nextState={nextState} />
  );
};

export default withRouter(PlayingLogic);
