import React from "react";
import styled from "styled-components";
import Lobby from "../components/shared/models/Lobby";
import GermanFlag from "../images/lang_DE.png";
import EnglishFlag from "../images/lang_EN.png";
import { handleError, api } from "../helpers/api";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  background-color: #454c62;
  cursor: pointer;
`;

const LobbyName = styled.p`
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: #fff;
`;

const LobbyInfo = styled.p`
  font-weight: lighter;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  color: #8f8f8f;
`;

const LobbyMeta = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  text-align: left;
  margin-left: 1rem;
  margin-right: 0.5rem;
`;

const Button = styled.div`
  align-self: flex-end;
  font-weight: bold;
  border-radius: 15px;
  background-color: ${props => (props.myLobby ? "#ff3b3b" : "#3b85ff")};
  color: #fff;
  display: block;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  margin-left: auto;
`;

const Flag = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: -8px;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
class JoinLobby extends React.Component {
  constructor() {
    super();
    this.joinThisLobby = this.joinThisLobby.bind(this);
  }

  async joinThisLobby(l) {
    const lobby = new Lobby(l);
    // join lobby normally
    try {
      // join lobby via put request
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put("/lobbies/" + lobby.id + "/join");
      console.log(response);

      // Redirect to Lobby Page
      this.props.history.push("/game/lobby/" + lobby.id);
    } catch (error) {
      //todo better error handling
      alert(error);
      console.log(
        `Something went wrong while join a lobby: \n${handleError(error)}`
      );
    }
  }

  render() {
    const lobby = new Lobby(this.props.lobby);
    return (
      <Container onClick={() => this.joinThisLobby(lobby)}>
        <LobbyMeta>
          <LobbyName>{lobby.lobbyName}</LobbyName>
          <LobbyInfo>
            {lobby.players ? lobby.players.length : "1"}/7 Players |{" "}
            {lobby.gameMode === "HUMANS" ? "No Bots" : "With Bots"} |{" "}
            <Flag src={lobby.language === "DE" ? GermanFlag : EnglishFlag} />
          </LobbyInfo>
        </LobbyMeta>
        <Button>Join</Button>
      </Container>
    );
  }
}
export default withRouter(JoinLobby);
