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

const Countdown = ({
  time,
  activeText,
  timeoutText,
  functionWhenDone,
  returnTime
}) => {
  // set initial timing in state
  time = time ? time : 30;
  activeText = activeText ? activeText : "Remaining Time: ";
  timeoutText = timeoutText ? timeoutText : "Time's over! Please wait...";

  // set counter state to time
  const [counter, setCounter] = React.useState(time);

  // if counter is > 0, update every second
  React.useEffect(() => {
    if (returnTime) {
      returnTime(time - counter);
    }
    counter > 0
      ? setTimeout(() => setCounter(counter - 1), 1000)
      : functionWhenDone && functionWhenDone();
  }, [counter]);

  return (
    <Wrapper>
      {counter > 0 ? (
        <Text number={counter}>
          {activeText}
          {counter}
        </Text>
      ) : (
        <Text number={0}>{timeoutText}</Text>
      )}
    </Wrapper>
  );
};

export default Countdown;
