import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Just_One_Logo from "../images/Just_One_Logo.png";
import ColorBG from "../images/color.png";
import Gradient from "../images/gradient.jpg";

/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */

//height: ${props => props.height}px;
const Container = styled.div`
  height: auto;
  background: ${props => props.background} no-repeat top center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${ColorBG});
`;

const Logo = styled.img`
  margin-top: 2rem;
  width: 300px;
  height: 300px;
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Caveat:400,700&display=swap');
  body {
    background: url(${Gradient}) no-repeat center top;
    background-size: 100% 100%;
    min-height: 100vh;
    font-family: 'Caveat', cursive;
  }
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = props => {
  return (
    <Container height={props.height}>
      <GlobalStyle />
      <Logo src={Just_One_Logo} alt="Just One" />
    </Container>
  );
};

/**
 * Don't forget to export your component!
 */
export default Header;
