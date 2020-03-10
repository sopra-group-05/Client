import React from "react";
import styled from "styled-components";

const SuccessMessage = styled.div`
  display: flex;
  width: 100%;
  color: green;
  font-size: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  display: flex;
  width: 100%;
  color: red;
  font-size: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  justify-content: center;
`;

/**
 *
 * @param success: Should the Message be displayed in Green (true) or red (false, default)
 * @param message: The message to be displayed. Default is success or Error
 * @param show: Controlls if the message container should be displayed at all. Default true.
 * @returns A Message Div With the message printed in red or green
 */
const MessageHandler = ({ success, message, show }) => {
  if (!show) {
    // don't show message at all
    return <React.Fragment />;
  } else if (success) {
    // show message in green
    return <SuccessMessage>{message ? message : "Success!"}</SuccessMessage>;
  } else {
    // show message in red
    return <ErrorMessage>{message ? message : "Error!"}</ErrorMessage>;
  }
};

export default MessageHandler;
