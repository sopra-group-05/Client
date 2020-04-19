import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  background-color: #454c62;
  a {
    color: #ce552e;
    display: flex;
    justify-content: left;
    align-items: center;
    min-width: 300px;
    text-decoration: none;
    margin: 0;
    padding: 0;
  }
`;

class ClueView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: this.props.lobby,
      clue: this.props.clue,
      error: null
    };
  }

  render() {
    return <Container>{this.state.clue.word}</Container>;
  }
}

export default withRouter(ClueView);
