import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import BigNumber from "./BigNumber";

const CardWrapper = styled.div`
  padding: 0;
  margin: 0;
`;
const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 1rem;
`;

const CardTitle = styled.h4`
  font-size: 1.5rem;
  padding: 0;
  margin: 0 0 1rem 0;
`;

const MysteryWord = styled.div`
  display: flex;
`;

class MysteryCard extends React.Component {
  constructor() {
    super();
    this.state = {
      mysteryCard: null,
      error: null
    };
    this.getLobbyMysteryWord = this.getLobbyMysteryWord.bind(this);
  }

  async getLobbyMysteryWord() {
    try {
      // todo: make API call to get the MysteryCard
    } catch (error) {
      // todo: error Handling
    }
  }

  render() {
    return (
      <CardWrapper>
        <Card>
          <CardTitle>Mystery Words</CardTitle>
          {
            // todo: generate Mystery Words and numbers from API Call
          }
          <MysteryWord>
            <BigNumber number={1} small={true} />
            First Word
          </MysteryWord>
        </Card>
      </CardWrapper>
    );
  }
}

export default withRouter(MysteryCard);
