import React from "react";
import styled from "styled-components";
import { Spinner } from "../../views/design/Spinner";

const ErrorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorContent = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  color: #fff;
  padding: 3rem;
  margin: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.2rem;
  font-weight: normal;
`;

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorContent>
        <Title>The server can't be reached at the moment</Title>
        <Description>Trying again in a few seconds</Description>
        <Spinner />
      </ErrorContent>
    </ErrorContainer>
  );
};

export default ErrorPage;
