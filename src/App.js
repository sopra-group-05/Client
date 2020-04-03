import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #151820;
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
`;

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return (
      <Wrapper>
        <AppRouter />
      </Wrapper>
    );
  }
}

export default App;
