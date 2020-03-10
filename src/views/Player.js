import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Container = styled.div`
  margin: 6px 0;
  width: 300px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  border: 1px solid #ffffff26;
  a {
    color: #ce552e;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-decoration: none;
    margin: 0;
    padding: 0;
  }
`;

const UserName = styled.div`
  font-weight: lighter;
  margin-left: 1rem;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
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
        <UserName>{user.username}</UserName>
        <Id>Id: {user.id}</Id>
      </Link>
    </Container>
  );
};

export default Player;
