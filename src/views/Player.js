import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

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
  font-size: 0.8rem;
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
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Player = ({ user }) => {
  return (
    <Container>
      <Link title={"To the profile"} to={"/game/dashboard/profile/" + user.id}>
        <Avatar size={40} user={user} />
        <UserInfo>
          <UserName>{user.username}</UserName>
          <UserScore>Score: {user.score}</UserScore>
        </UserInfo>
        <Button>View Profile</Button>
      </Link>
    </Container>
  );
};

export default Player;
