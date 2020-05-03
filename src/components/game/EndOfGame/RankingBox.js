import React from "react";
import styled from "styled-components";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import Box from "../../../views/Box";
import { Spinner } from "../../../views/design/Spinner";
import Stats from "../../shared/models/Stats";
import Lobby from "../../shared/models/Lobby";

const Container = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background-color: #454c62;
  width: available;
  a {
    color: #ce552e;
    display: flex;
    justify-content: stretch;
    align-items: center;
    min-width: 300px;
    text-decoration: none;
    margin: 0;
    padding: 0;
  }
`;

const GridContainer = styled.div`
  display: grid;
`;

const FactorTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  padding: 1rem 2rem 1rem 2rem;
  margin: 0;
  text-transform: uppercase;
`;

const RankingRow = styled.div`
  display: flex;
  flex-direction: row;
  width: available;
  justify-self: stretch;
  justify-content: space-between;
`;

const FactorLocalPlayer = styled.h4`
  font-size: 1rem;
  font-weight: bolder;
  color: #fff;
  padding: 1rem 2rem 1rem 2rem;
  margin: 0;
  text-transform: uppercase;
`;

const FactorOtherPlayer = styled.h4`
  font-size: 1rem;
  font-weight: normal;
  color: #fff;
  padding: 1rem 2rem 1rem 2rem;
  margin: 0;
  text-transform: uppercase;
`;

const rankingNames = new Stats({
  playerId: "Id",
  playerName: "Name",
  score: "Score",
  guessCount: "Guesses",
  correctGuessCount: "Correct",
  timeToGuess: "Time to guess",
  givenClues: "Clues",
  goodClues: "Good",
  timeForClue: "Time to write clues",
  teamPoints: "Team Points"
});

class RankingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: this.props.lobby,
      stats: [],
      error: null
    };
    this.getStats = this.getStats.bind(this);
  }

  async getStats() {
    const lobby = new Lobby(this.state.lobby);
    try {
      // add token to request
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("lobbies/" + lobby.id + "/stats");

      // convert to Stats model
      const stats = response.data.map(data => {
        return new Stats(data);
      });

      if (this.state.stats === [] && response.data) {
        // make API call every 1s to get Updated lobbies List.
        // Will have to be destroyed in componentWIllUnmount()!
        // only set interval the very first time you call the API
        this.interval = setInterval(this.getLobbies, 1000);
      }

      this.setState({ stats: stats, error: null });
      //console.log(this.state.stats);
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while fetching the stats: \n${handleError(error)}`
      );
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    this.getStats();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const stats = this.state.stats;
    return stats.length > 0 ? (
      <Box title={"Ranking"}>
        {this.state.lobby && (
          <FactorTitle>
            As a Team, you got {stats[0].teamPoints} points!
          </FactorTitle>
        )}
        <GridContainer>
          <RankingRow>
            <FactorTitle>{rankingNames.playerName}</FactorTitle>
            <FactorTitle>{rankingNames.score}</FactorTitle>
            <FactorTitle>{rankingNames.guessCount}</FactorTitle>
            <FactorTitle>{rankingNames.correctGuessCount}</FactorTitle>
            <FactorTitle>{rankingNames.timeToGuess}</FactorTitle>
            <FactorTitle>{rankingNames.givenClues}</FactorTitle>
            <FactorTitle>{rankingNames.goodClues}</FactorTitle>
            <FactorTitle>{rankingNames.timeForClue}</FactorTitle>
            <FactorTitle>{rankingNames.teamPoints}</FactorTitle>
          </RankingRow>
          <Container>
            {stats.map(stat => {
              const ComponentClass =
                stat.playerId == localStorage.getItem("userId")
                  ? FactorLocalPlayer
                  : FactorOtherPlayer;
              return (
                <RankingRow key={stat.playerId}>
                  <ComponentClass>{stat.playerName}</ComponentClass>
                  <ComponentClass>{stat.score}</ComponentClass>
                  <ComponentClass>{stat.guessCount}</ComponentClass>
                  <ComponentClass>{stat.correctGuessCount}</ComponentClass>
                  <ComponentClass>{stat.timeToGuess}</ComponentClass>
                  <ComponentClass>{stat.givenClues}</ComponentClass>
                  <ComponentClass>{stat.goodClues}</ComponentClass>
                  <ComponentClass>{stat.timeForClue}</ComponentClass>
                  <ComponentClass>{stat.teamPoints}</ComponentClass>
                </RankingRow>
              );
            })}
          </Container>
        </GridContainer>
      </Box>
    ) : (
      <Spinner />
    );
  }
}

export default withRouter(RankingBox);
