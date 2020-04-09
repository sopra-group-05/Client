import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
`;

const Text = styled.p`
  display: block;
  padding: 1rem 0.5rem;
  color: ${props => (props.number <= 5 ? "#ee232b" : "#fff")};
`;

const Countdown = ({ time }) => {
  // set initial timing in state
  time = time ? time : 30;
  const [counter, setCounter] = React.useState(time);

  // if counter is > 0, update every second
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <Wrapper>
      {counter > 0 ? (
        <Text number={counter}>Remaining Time: {counter}</Text>
      ) : (
        <Text number={0}>Time's over! Please wait...</Text>
      )}
    </Wrapper>
  );
};

export default Countdown;
