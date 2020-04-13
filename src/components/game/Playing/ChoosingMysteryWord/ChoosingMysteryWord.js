import React from "react";
import { withRouter } from "react-router-dom";
import ChooseNumber from "./ChooseNumber";
import WaitForNumber from "./WaitForNumber";

const ChoosingMysteryWord = ({ lobby, isGuesser, nextState }) => {
  if (isGuesser) {
    return <ChooseNumber l={lobby} nextState={nextState} />;
  } else {
    return <WaitForNumber l={lobby} nextState={nextState} />;
  }
};

export default withRouter(ChoosingMysteryWord);
