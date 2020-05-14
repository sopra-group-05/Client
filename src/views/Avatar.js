import React from "react";
import styled from "styled-components";

const AvatarImage = styled.img`
  border-radius: 50%;
  width: ${props => props.size + "px"};
  height: ${props => props.size + "px"};
  padding: ${props => (props.padding ? "1rem" : "0")};
  flex-grow: 0;
  flex-shrink: 0;
`;

/**
 *
 * @param user: A Object of user, needs the id prop of this object, will be renamed to default if none given
 * @param size: default 150, how big should the avatar be?
 * @returns a div with the avatar imported from the adorable api
 */
const Avatar = ({ user, size, padding }) => {
  size = size ? size : 100;
  const userid = user ? user.id : "default";
  return (
    <AvatarImage
      size={size}
      padding={padding}
      src={
        "https://api.adorable.io/avatars/" +
        size +
        "/" +
        userid +
        "@justone.png"
      }
    />
  );
};

export default Avatar;
