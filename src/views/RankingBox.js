import React from "react";
import styled from "styled-components";
import { api, handleError } from "../helpers/api";
import { withRouter } from "react-router-dom";
import Box from "./Box";
import { Spinner } from "./design/Spinner";
import Stats from "../components/shared/models/Stats";
import Lobby from "../components/shared/models/Lobby";

const NO_LOBBY = 4;
const YES_LOBBY = 9;

const Container = styled.div`
  border-radius: 15px;
  display: grid;
  background-color: #454c62;
  justify-items: stretch;
  grid-column: 1 / ${props => (props.hasLobby ? YES_LOBBY + 1 : NO_LOBBY + 1)};
  grid-row: 2 / end;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${props => (props.hasLobby ? YES_LOBBY : NO_LOBBY)},
    1fr
  );
  grid-template-rows: ${props => props.length + 1};
  justify-items: stretch;
`;

const FactorTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  padding: 1rem 2rem 1rem 2rem;
  margin: 0;
  text-transform: uppercase;
`;

const FactorButton = styled.button`
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  background: none;
  border: 0;
  box-shadow: none;
  border-radius: 0;
  padding: 1rem 2rem 1rem 2rem;
  margin: 0;
  text-transform: uppercase;
`;

const RankingRow = styled.div`
  display: grid;
  justify-items: stretch;
  grid-template-columns: repeat(
    ${props => (props.hasLobby ? YES_LOBBY : NO_LOBBY)},
    ${props => (props.hasLobby ? 100 / YES_LOBBY : 100 / NO_LOBBY)}%
  );
  grid-template-rows: 100%;
  grid-column-start: 1;
  grid-column-end: ${props => (props.hasLobby ? YES_LOBBY + 1 : NO_LOBBY + 1)};
  grid-row-start: ${props => props.row + 1};
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
  correctGuessCount: "Correct Guesses",
  timeToGuess: "Time to guess",
  givenClues: "Clues",
  goodClues: "Good Clues",
  timeForClue: "Time to write clues",
  teamPoints: "Team Points"
});

/*
const exampleStats = [
  new Stats({
    playerId: 15,
    playerName: "TestOne",
    score: 2,
    guessCount: 5,
    correctGuessCount: 4,
    timeToGuess: 34,
    givenClues: 6,
    goodClues: 2,
    timeForClue: 20,
    teamPoints: 13
  }),
  new Stats({
    playerId: 16,
    playerName: "Tom",
    score: 45,
    guessCount: 7,
    correctGuessCount: 6,
    timeToGuess: 14,
    givenClues: 4,
    goodClues: 4,
    timeForClue: 24,
    teamPoints: 13
  }),
  new Stats({
    playerId: 17,
    playerName: "balaaaa",
    score: 10,
    guessCount: 7,
    correctGuessCount: 7,
    timeToGuess: 7,
    givenClues: 7,
    goodClues: 7,
    timeForClue: 7,
    teamPoints: 13
  }),
  new Stats({
    playerId: 18,
    playerName: "IdiotNo18",
    score: 0,
    guessCount: 0,
    correctGuessCount: 0,
    timeToGuess: 0,
    givenClues: 0,
    goodClues: 0,
    timeForClue: 0,
    teamPoints: 13
  }),
  new Stats({
    playerId: 20,
    playerName: "Jimantha",
    score: 35,
    guessCount: 10,
    correctGuessCount: 5,
    timeToGuess: 50,
    givenClues: 6,
    goodClues: 8,
    timeForClue: 89,
    teamPoints: 13
  })
];
*/

class RankingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: this.props.lobby,
      stats: [],
      sortConfig: {
        key: "score",
        dir: "descending"
      },
      sortedStats: [],
      error: null
    };
    this.getStats = this.getStats.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.setSortConfig = this.setSortConfig.bind(this);
    this.transformKey = this.transformKey.bind(this);
  }

  async getStats() {
    try {
      // add token to request
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      let response;
      let stats;
      if (this.state.lobby) {
        const lobby = new Lobby(this.state.lobby);
        response = await api.get("lobbies/" + lobby.id + "/stats");
        // convert to Stats model
        stats = response.data.map(data => {
          return new Stats(data);
        });
      } else {
        response = await api.get(
          "users/ranking/" + this.transformKey(this.state.sortConfig.key)
        );
        stats = response.data;
      }

      console.log(stats);

      this.intervalID = setTimeout(this.getStats, 1000);

      this.setState({
        stats: stats,
        sortedStats: this.sortBy(stats),
        error: null
      });
    } catch (error) {
      this.setState({ error: error ? error.message : "Unknown error" });
      console.log(
        `Something went wrong while fetching the stats: \n${handleError(error)}`
      );
      clearTimeout(this.intervalID);
      /*
      const creatorStats = new Stats({
        playerId: lobby.creator.id,
        playerName: lobby.creator.username,
        score: 35,
        guessCount: 10,
        correctGuessCount: 5,
        timeToGuess: 50,
        givenClues: 6,
        goodClues: 8,
        timeForClue: 89,
        teamPoints: 13
      });
      exampleStats.push(creatorStats);
      this.setState({
        stats: exampleStats,
        sortedStats: this.sortBy(exampleStats)
      });
      console.log(exampleStats);
      */
    }
  }

  sortBy(stats) {
    const sortConfig = this.state.sortConfig;
    const sortedStats = [...stats];
    const compareFnDefault = (a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.dir === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.dir === "ascending" ? 1 : -1;
      }
      return 0;
    };
    const compareFnName = (a, b) => {
      if (a[sortConfig.key].toLowerCase() < b[sortConfig.key].toLowerCase()) {
        return sortConfig.dir === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key].toLowerCase() > b[sortConfig.key].toLowerCase()) {
        return sortConfig.dir === "ascending" ? 1 : -1;
      }
      return 0;
    };
    const sortFn =
      sortConfig.key === "playerName" ? compareFnName : compareFnDefault;
    sortedStats.sort(sortFn);
    return sortedStats;
  }

  transformKey(sortKey) {
    const map = {
      username: "USERNAME",
      score: "SCORE",
      correctGuesses: "CORRECT_GUESSES",
      bestClues: "BEST_CLUES"
    };
    console.log(sortKey);
    return map[sortKey];
  }

  componentDidMount() {
    this.getStats();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  setSortConfig(sortKey) {
    let direction = "descending";
    if (
      this.state.sortConfig.key === sortKey &&
      this.state.sortConfig.dir === "descending"
    ) {
      direction = "ascending";
    }
    this.setState({ sortConfig: { key: sortKey, dir: direction } });
  }

  arrowSorted(sortKey) {
    if (sortKey !== this.state.sortConfig.key) return " ";
    return this.state.sortConfig.dir === "ascending" ? "↑" : "↓";
  }

  render() {
    const stats = this.sortBy(this.state.stats);
    return stats.length > 0 ? (
      <Box title={"Ranking"}>
        {this.state.lobby && (
          <FactorTitle>
            As a Team, you got {stats[0].teamPoints} points!
          </FactorTitle>
        )}
        <GridContainer length={stats.length} hasLobby={this.state.lobby}>
          <RankingRow row={0} hasLobby={this.state.lobby}>
            {this.state.lobby ? (
              <FactorButton onClick={() => this.setSortConfig("playerName")}>
                {rankingNames.playerName}
                {this.arrowSorted("playerName")}
              </FactorButton>
            ) : (
              <FactorButton onClick={() => this.setSortConfig("username")}>
                {rankingNames.playerName}
                {this.arrowSorted("username")}
              </FactorButton>
            )}

            <FactorButton onClick={() => this.setSortConfig("score")}>
              {rankingNames.score}
              {this.arrowSorted("score")}
            </FactorButton>
            {this.state.lobby && (
              <FactorButton onClick={() => this.setSortConfig("guessCount")}>
                {rankingNames.guessCount}
                {this.arrowSorted("guessCount")}
              </FactorButton>
            )}
            {this.state.lobby ? (
              <FactorButton
                onClick={() => this.setSortConfig("correctGuessCount")}
              >
                {rankingNames.correctGuessCount}
                {this.arrowSorted("correctGuessCount")}
              </FactorButton>
            ) : (
              <FactorButton
                onClick={() => this.setSortConfig("correctGuesses")}
              >
                {rankingNames.correctGuessCount}
                {this.arrowSorted("correctGuesses")}
              </FactorButton>
            )}
            {this.state.lobby && (
              <FactorButton onClick={() => this.setSortConfig("timeToGuess")}>
                {rankingNames.timeToGuess}
                {this.arrowSorted("timeToGuess")}
              </FactorButton>
            )}
            {this.state.lobby && (
              <FactorButton onClick={() => this.setSortConfig("givenClues")}>
                {rankingNames.givenClues}
                {this.arrowSorted("givenClues")}
              </FactorButton>
            )}
            {this.state.lobby ? (
              <FactorButton onClick={() => this.setSortConfig("goodClues")}>
                {rankingNames.goodClues}
                {this.arrowSorted("goodClues")}
              </FactorButton>
            ) : (
              <FactorButton onClick={() => this.setSortConfig("bestClues")}>
                {rankingNames.goodClues}
                {this.arrowSorted("bestClues")}
              </FactorButton>
            )}
            {this.state.lobby && (
              <FactorButton onClick={() => this.setSortConfig("timeForClue")}>
                {rankingNames.timeForClue}
                {this.arrowSorted("timeForClue")}
              </FactorButton>
            )}
            {this.state.lobby && (
              <FactorButton onClick={() => this.setSortConfig("teamPoints")}>
                {rankingNames.teamPoints}
                {this.arrowSorted("teamPoints")}
              </FactorButton>
            )}
          </RankingRow>
          <Container hasLobby={this.state.lobby}>
            {stats.map(stat => {
              const keyId = this.state.lobby ? stat.playerId : stat.id;
              const ComponentClass =
                keyId == localStorage.getItem("userId")
                  ? FactorLocalPlayer
                  : FactorOtherPlayer;
              return (
                <RankingRow
                  key={keyId}
                  row={stats.indexOf(stat) + 1}
                  hasLobby={this.state.lobby}
                >
                  {this.state.lobby ? (
                    <ComponentClass>{stat.playerName}</ComponentClass>
                  ) : (
                    <ComponentClass>{stat.username}</ComponentClass>
                  )}
                  <ComponentClass>{stat.score}</ComponentClass>
                  {this.state.lobby && (
                    <ComponentClass>{stat.guessCount}</ComponentClass>
                  )}
                  {this.state.lobby ? (
                    <ComponentClass>{stat.correctGuessCount}</ComponentClass>
                  ) : (
                    <ComponentClass>{stat.correctGuesses}</ComponentClass>
                  )}
                  {this.state.lobby && (
                    <ComponentClass>{stat.timeToGuess}</ComponentClass>
                  )}
                  {this.state.lobby && (
                    <ComponentClass>{stat.givenClues}</ComponentClass>
                  )}
                  {this.state.lobby ? (
                    <ComponentClass>{stat.goodClues}</ComponentClass>
                  ) : (
                    <ComponentClass>{stat.bestClues}</ComponentClass>
                  )}
                  {this.state.lobby && (
                    <ComponentClass>{stat.timeForClue}</ComponentClass>
                  )}
                  {this.state.lobby && (
                    <ComponentClass>{stat.teamPoints}</ComponentClass>
                  )}
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
