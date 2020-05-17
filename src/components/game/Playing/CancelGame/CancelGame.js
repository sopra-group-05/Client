import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import {
  PlayingDescription,
  PlayingTitle,
  PlayingWrapper
} from "../PlayingStyle";
import Countdown from "../../../../views/Countdown";
import { Button} from "../PlayingStyle";

const CancelGame = ({ goBackToDashboard }) => {
  return (
    <PlayingWrapper>
      <PlayingTitle> Game is canceled </PlayingTitle>
      <PlayingDescription style = {{margin: "2rem"}}>
      	Too many players have left the game. The game will be stopped now. <br/>
      	If you like you can start a new game in the dashboard. Have fun.
      </PlayingDescription>
      <Countdown
        activeText={"You will leave the game in  "}
        timeoutText={"Bye Bye"}
        functionWhenDone={goBackToDashboard}
        time={15}
      />
	  <Button
	      colorDef={"#3b85ff"}
		  width={"12em"}
		  onClick={() => {goBackToDashboard();}}
	  >
       Go back to dashboard
	  </Button>
    </PlayingWrapper>
  );
};

export default withRouter(CancelGame);
