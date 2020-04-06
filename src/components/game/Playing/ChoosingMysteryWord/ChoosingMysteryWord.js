import React from "react";
import { withRouter } from "react-router-dom";
import ChooseNumber from "./ChooseNumber";
import WaitForNumber from "./WaitForNumber";

const ChoosingMysteryWord = ({ lobby, isGuesser }) => {
  if (isGuesser) {
    return <ChooseNumber l={lobby} />;
  } else {
    return <WaitForNumber l={lobby} />;
  }
};

export default withRouter(ChoosingMysteryWord);
