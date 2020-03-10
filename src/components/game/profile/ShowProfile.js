import React from "react";
import styled from "styled-components";
import { Spinner } from "../../../views/design/Spinner";
import Offline from "../../../images/user-offline.png";
import Online from "../../../images/user-online.png";

const ProfileContainer = styled.div`
  width: 100%;
`;

const ProfileTitle = styled.h2`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const ProfileInfo = styled.p`
  margin: 0;
  padding: 0;
`;

const UserStatus = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 0.75rem;
`;

/**
 *
 * @param user: User Object
 * @returns The Profile Info of the user. If no user is given, a spinner will be displayed.
 * @constructor
 */
const ShowProfile = ({ user }) => {
  if (!user) {
    return <Spinner />;
  }
  return (
    <ProfileContainer>
      <ProfileTitle>
        {user.username}
        <UserStatus
          title={user.status}
          src={user.status === "ONLINE" ? Online : Offline}
        />
      </ProfileTitle>
      <ProfileInfo>
        Register Date: {user.created}. <br />
        Birthday: {user.birthday ? user.birthday : "Not given"} <br />
        Status: {user.status}
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default ShowProfile;
