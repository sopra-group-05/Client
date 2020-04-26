import React from "react";
import styled from "styled-components";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import Box from "../../../views/Box";
import { Spinner } from "../../../views/design/Spinner";

const Container = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
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

class RankingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: this.props,
      error: null
    };
    //this.getLobby = this.getLobby.bind(this);
  }

  /*  async getLobby() {
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
  }*/

  componentDidMount() {
    //this.getLobby();
  }

  componentWillUnmount() {
    // stop Interval when Component gets hidden.
    // If you don't do this, it will call the API every 1s even the component is not active anymore!
    //clearInterval(this.interval);
  }

  render() {
    return this.state.lobby ? (
      <Box title={"Ranking"}>
        <Container>blabla</Container>
      </Box>
    ) : (
      <Spinner />
    );
  }
}

export default withRouter(RankingBox);
