import React from "react";
import styled from "styled-components";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../../game/Dashboard";
import Profile from "../../game/Profile/Profile";
import LobbyPage from "../../game/Lobby/LobbyPage";
import PlayingContainer from "../../game/Playing/PlayingContainer";
import EndOfGameContainer from "../../game/EndOfGame/EndOfGameContainer";
import FullRules from "../../game/Rules/FullRules";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Switch>
          <Route
            exact
            path={`${this.props.base}/dashboard`}
            render={() => <Dashboard />}
          />

          <Route
            exact
            path={`${this.props.base}/dashboard/profile/:id`}
            component={Profile}
          />

          <Route
            exact
            path={`${this.props.base}`}
            render={() => <Redirect to={`${this.props.base}/dashboard`} />}
          />

          <Route
            exact
            path={`${this.props.base}/lobby/:id`}
            component={LobbyPage}
          />

          <Route
            exact
            path={`${this.props.base}/rules`}
            component={FullRules}
          />

          <Route
            exact
            path={`${this.props.base}/lobby/:id/game`}
            component={PlayingContainer}
          />
          <Route
            exact
            path={`${this.props.base}/lobby/:id/gameover`}
            component={EndOfGameContainer}
          />
        </Switch>
      </Container>
    );
  }
}
/*
 * Don't forget to export your component!
 */
export default GameRouter;
