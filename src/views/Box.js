import React from "react";
import styled from "styled-components";

const BoxOuter = styled.div`
  margin-top: 20px;
  min-width: 350px;
`;

const BoxHeader = styled.div`
  background-color: #454c62;
  border-radius: 20px;
  display: inline-block;
`;
const BoxTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  padding: 1rem 2rem 1rem 2rem;
  margin: 0;
`;

const BoxContainer = styled.div`
  background-color: #242b45;
  border-radius: 20px;
  min-height: 100px;
  margin: -25px 0 0 0;
  padding: 2.5rem 1rem 1rem 1rem;
  color: #fff;
`;

/**
 *
 * @param user: A Object of user, needs the username prop of that, will be renamed to default if none given
 * @param size: default 150, how big should the avatar be?
 * @returns a div with the avatar imported from the adorable api
 */
const Box = ({ children, title, titleWidth, titleAlign }) => {
  const boxTitle = title ? title : "No Title";
  const headerTitleWidth = titleWidth ? titleWidth : 'auto';
  const align = titleAlign ? titleAlign : 'center'
  return (
    <BoxOuter>
      <BoxHeader style={{width:headerTitleWidth, textAlign:align}}>
        <BoxTitle>{boxTitle}</BoxTitle>
      </BoxHeader>
      <BoxContainer>{children}</BoxContainer>
    </BoxOuter>
  );
};

export default Box;
