import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Number = styled.span`
  font-size: ${props => (props.small ? "2rem" : "4rem")};
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10%;
  display: block;
  padding: 0rem 1.5rem;
  margin: 1rem;
  cursor: pointer;
  color: ${props => (props.color ? props.color : "#fff")};
`;

const BigNumber = ({ number, handleClick, small }) => {
  const color = determineColor(number);
  return (
    <Number
      small={small}
      onClick={handleClick ? () => handleClick(number) : ""}
      color={color}
      title={"You want mystery word number " + number}
    >
      {number}
    </Number>
  );
};

function determineColor(number) {
  if (number === 1) {
    return "#00a5ee";
  } else if (number === 2) {
    return "#39b346";
  } else if (number === 3) {
    return "#ee232b";
  } else if (number === 4) {
    return "#f79219";
  } else {
    return "#ffdc15";
  }
}

export default withRouter(BigNumber);
