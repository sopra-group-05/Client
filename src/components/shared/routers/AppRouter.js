import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Register from "../../register/Register";
import ErrorPage from "../ErrorPage";
import { api, handleError } from "../../../helpers/api";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false
    };
    this.getServerStatus = this.getServerStatus.bind(this);
  }

  async getServerStatus() {
    try {
      await api.get("/");

      // set Error to false if there's a response
      this.setState({ error: false });
    } catch (error) {
      this.setState({ error: true });
    }
  }

  componentDidMount() {
    this.getServerStatus();
    // check for server status every 10s
    this.interval = setInterval(this.getServerStatus, 10000);
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every X seconds even the component is not active anymore!
    clearInterval(this.interval);
  }
  render() {
    return (
      <BrowserRouter>
        {this.state.error ? (
          <ErrorPage />
        ) : (
          <Switch>
            <div>
              <Route
                path="/game"
                render={() => (
                  <GameGuard>
                    <GameRouter base={"/game"} />
                  </GameGuard>
                )}
              />
              <Route
                exact
                path="/login"
                render={() => (
                  <LoginGuard>
                    <Login />
                  </LoginGuard>
                )}
              />
              <Route exact path="/register" render={() => <Register />} />
              <Route exact path="/" render={() => <Redirect to={"/game"} />} />
            </div>
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}
/*
 * Don't forget to export your component!
 */
export default AppRouter;
