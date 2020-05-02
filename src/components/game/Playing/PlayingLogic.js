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
  let Component = ChoosingMysteryWord;
  if (state) {
    // todo remove when backend works
    // this part is for the previewing phase. it will be removed once all part of the backend work
    const old_states = [
      ChoosingMysteryWord,
      WritingClues,
      ClueComparison,
      Guess,
      EndRound
    ]; // add your views at correct position
    state = state % old_states.length;
    Component = old_states[state];
  } else {
    const states = new Map();
    // set States and which Component should be rendered given the Status of a player.
    states.set("PICKING_NUMBER", ChoosingMysteryWord);
    states.set("WAITING_FOR_NUMBER", ChoosingMysteryWord);

    states.set("WAITING_FOR_CLUES", WritingClues);
    states.set("WRITING_CLUES", WritingClues);

    states.set("WAITING_FOR_REVIEW", ClueComparison);
    states.set("REVIEWING_CLUES", ClueComparison);

    states.set("GUESSING_WORD", Guess);
    states.set("WAITING_FOR_GUESS", Guess);

    states.set("END_OF_TURN", EndRound);
    states.set("READY", EndRound);

    // Select Component to render depending on the players OWN Status!
    lobby = new Lobby(lobby);
    let player = lobby.players.find(
      player => player.id == localStorage.getItem("userId")
    );
    Component = states.get(player.status);
  }

  return (
    <Component lobby={lobby} isGuesser={isGuesser} nextState={nextState} />
  );
};

export default withRouter(PlayingLogic);
