import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import DeleteIcon from "../images/delete.png"
import { Button } from "./design/Button";
import * as PropTypes from "prop-types";

const Container = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 15px;
  display: flex;
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

const PlayerName = styled.p`
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: #fff;
  min-width: 50px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-top: 1rem;
`;

const IconPlaceholder = styled.div`
  width: 25px;
  height: 25px;
  margin-top: 1rem;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
class PlayerInLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreator: this.props.isCreator
    };
    this.removePlayerFromLobby = this.removePlayerFromLobby.bind(this);
  }

  async removePlayerFromLobby(){
    try {
      console.log("will delete player; still todo")
    } catch (error) {
      console.log("an error happened: " + error.getMessage())
    }
  }

  render() {
    let { player } = this.props;
    return (
      <Container>
        <Avatar size={40} user={player}/>
        <PlayerName>{player.username}</PlayerName>
        {(this.state.isCreator)? (
          <Icon src={DeleteIcon}/>
        ):
          (<IconPlaceholder/>)}
      </Container>
    );
  }
}

export default PlayerInLobby;
