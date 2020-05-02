import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { api } from "../helpers/api";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-radius: 15px;
  background-color: #454c62;
  width: 100%;
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

const UserName = styled.p`
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: #fff;
`;

const UserScore = styled.p`
  font-weight: lighter;
  margin: 0;
  padding: 0;
  color: #8f8f8f;
`;

const UserInfo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  text-align: left;
  margin-left: 1rem;
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
  cursor: pointer;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const PlayerInvite = ({ user, lobbyId }) => {
  const inviteUser = async () => {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.put(
        "/lobbies/" + lobbyId + "/invite/" + user.id
      );
      console.log(response);
    } catch (error) {
      console.log("Could not add user: " + error);
    }
  };

  return (
    <Container>
      <Avatar size={40} user={user} />
      <UserInfo>
        <UserName>{user.username}</UserName>
        <UserScore>Score: XY</UserScore>
      </UserInfo>
      <Button
        onClick={() => {
          inviteUser();
        }}
      >
        Invite
      </Button>
    </Container>
  );
};

export default withRouter(PlayerInvite);
