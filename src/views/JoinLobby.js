import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Lobby from "../components/shared/models/Lobby";
import GermanFlag from "../images/lang_DE.png";
import EnglishFlag from "../images/lang_EN.png";

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

const LobbyName = styled.p`
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: #fff;
`;

const LobbyInfo = styled.p`
  font-weight: lighter;
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
  background-color: #3b85ff;
  color: #fff;
  display: block;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  margin-left: auto;
`;

const Flag = styled.img`
  width: 25px;
  height: 25px;
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
// todo: Shouldn't just redirect to lobby, it should JOIN that Lobby via the API and then redirect if it's allowed to join.
const JoinLobby = ({ lobby }) => {
  const availableLobby = new Lobby(lobby);
  return (
    <Container>
      <Link
        onClick={() =>
          alert(
            "This will redirect to /game/lobby/id. Maybe that Component was not yet implemented."
          )
        }
        title={"Join this Lobby"}
        to={"/game/lobby/" + availableLobby.id}
      >
        <LobbyMeta>
          <LobbyName>{availableLobby.lobbyName}</LobbyName>
          <LobbyInfo>
            {availableLobby.players ? availableLobby.players.length : "1"}/7
            Players | {availableLobby.gameMode === 0 ? "No Bots" : "With Bots"}{" "}
            |{" "}
            <Flag
              src={availableLobby.language == "EN" ? GermanFlag : EnglishFlag}
            />
          </LobbyInfo>
        </LobbyMeta>
        <Button>Join</Button>
      </Link>
    </Container>
  );
};

export default JoinLobby;
