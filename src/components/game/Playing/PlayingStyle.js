import styled from "styled-components";
import { Spinner } from "../../../views/design/Spinner";
import Box from "../../../views/Box";
import React from "react";

export const Wrapper = styled.div`
  margin-right: 2rem;
  width: 100%;
  flex-grow: 2;
`;

export const PlayingContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
`;

export const PlayingTitle = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  padding: 0;
  margin: 0;
  color: #fff;
`;

export const PlayingDescription = styled.p`
  font-size: 1.3rem;
  font-weight: normal;
  padding: 0;
  margin: 0;
  color: #fff;
`;

const Header = styled.div`
  margin-top: 3rem;
  margin-bottom: -1.75rem;
`;

export const Button = styled.button`
  margin-top: 1rem;
  font-weight: bold;
  border-radius: 15px;
  background-color: ${props =>
    props.background ? props.background : "#3b85ff"};
  color: ${props => (props.color ? props.color : "#fff")};
  display: block;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  border: none;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

export const PlayingWrapper = ({ headerText, children }) => {
  return (
    <Wrapper>
      {headerText && (
        <Header>
          <PlayingDescription>
            {headerText} <br />
            <Spinner />
          </PlayingDescription>
        </Header>
      )}
      <Box hideHeader={true}>
        <PlayingContent>{children}</PlayingContent>
      </Box>
    </Wrapper>
  );
};
