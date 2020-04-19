import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../../helpers/layout";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Spinner } from "../../../views/design/Spinner";
import { Button } from "../Playing/PlayingStyle";
import Box from "../../../views/Box";

const Container = styled(BaseContainer)`
  padding-left: 3rem;
  color: black;
  text-align: center;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
`;

class EndOfGameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: null,
      error: null
    };
    this.getLobby = this.getLobby.bind(this);
  }

  async getLobby() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/lobbies/" + this.props.match.params.id);

      if (this.state.lobby === null && response.data) {
        // make API call every 1s to get Updated lobbies List.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobby, 1000);
      }

      // Get the returned lobby and update the state.
      this.setState({ lobby: response.data, error: null });
      console.log(response);
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while fetching the lobby: \n${handleError(error)}`
      );
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.getLobby();
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    clearInterval(this.interval);
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar disabled={false} />
        <Container>
          {this.state.lobby ? <Box title={"Ranking"} /> : <Spinner />}
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(EndOfGameContainer);
