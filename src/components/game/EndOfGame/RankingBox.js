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

// TODO: remove/change data structure when BE is there
const TestRankingData = [
  {
    playerId: "",
    name: "Name",
    score: "Score",
    guesses: "Guesses",
    correct: "Correct",
    time_to_guess: "Time to guess",
    clues: "Clues",
    good: "Good",
    time_to_write_clues: "Time to write clues"
  },
  {
    playerId: 1,
    name: "Florian",
    score: 200,
    guesses: 20,
    correct: 8,
    time_to_guess: 38,
    clues: 50,
    good: 36,
    time_to_write_clues: 24
  },
  {
    playerId: 2,
    name: "Yanik",
    score: 170,
    guesses: 20,
    correct: 8,
    time_to_guess: 38,
    clues: 50,
    good: 36,
    time_to_write_clues: 24
  },
  {
    playerId: 3,
    name: "Player XYZ",
    score: 137,
    guesses: 20,
    correct: 8,
    time_to_guess: 38,
    clues: 50,
    good: 36,
    time_to_write_clues: 24
  },
  {
    playerId: 4,
    name: "Anja",
    score: 87,
    guesses: 20,
    correct: 8,
    time_to_guess: 38,
    clues: 50,
    good: 36,
    time_to_write_clues: 24
  },
  {
    playerId: 5,
    name: "ABC",
    score: 33,
    guesses: 20,
    correct: 8,
    time_to_guess: 38,
    clues: 50,
    good: 36,
    time_to_write_clues: 24
  }
];

class RankingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: this.props,
      error: null,
      rankingData: TestRankingData // TODO: null when BE ready
    };
    this.getRanking = this.getRanking.bind(this);
  }

  async getRanking() {
    // TODO: fetch data from server? or in lobby data already?
    console.log("Rankings will be fetched");
  }

  componentDidMount() {
    this.getRanking();
  }

  render() {
    const factors = this.state.rankingData[0];
    const actualData = this.state.rankingData.slice(1);
    return this.state.rankingData ? (
      <Box title={"Ranking"}>
        <RankingRow>
          {Object.keys(factors).map(key => {
            return (
              key !== "playerId" && <FactorTitle>{factors[key]}</FactorTitle>
            );
          })}
        </RankingRow>
        <Container>
          {Object.keys(actualData).map(data => {
            const ComponentClass =
              data[0] == localStorage.getItem("userId")
                ? FactorLocalPlayer
                : FactorOtherPlayer;
            return (
              <RankingRow>
                {Object.keys(actualData[data]).map(key => {
                  return (
                    key !== "playerId" && (
                      <ComponentClass>{actualData[data][key]}</ComponentClass>
                    )
                  );
                })}
              </RankingRow>
            );
          })}
        </Container>
      </Box>
    ) : (
      <Spinner />
    );
  }
}

export default withRouter(RankingBox);
