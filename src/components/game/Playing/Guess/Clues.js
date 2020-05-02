import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const Clue = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-bottom: 0.5rem;
  padding: 0.3rem 0.5rem;
`;

const Clues = ({ cluesList }) => {
  return (
    <Wrapper>
      <p>Your teammates clues:</p>
      {cluesList.map(clue => {
        return <Clue>{clue.hint}</Clue>;
      })}
    </Wrapper>
  );
};

export default Clues;
