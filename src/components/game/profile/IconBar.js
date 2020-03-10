import { Link } from "react-router-dom";
import backwardsIcon from "../../../images/backwards.png";
import abortIcon from "../../../images/abort.png";
import editUserIcon from "../../../images/edit_user_icon.png";
import React from "react";
import styled from "styled-components";

const IconContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  a {
    width: 25px !important;
    height: 25px;
  }
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

const EditIcon = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const IconBar = ({ user, handleEdit, edit }) => {
  return (
    <IconContainer>
      <Link to="/game/dashboard" title="Back to the Dashboard">
        <Icon src={backwardsIcon} />
      </Link>
      {user.id === parseInt(localStorage.getItem("userId")) && (
        <EditIcon
          onClick={() => handleEdit()}
          src={edit ? abortIcon : editUserIcon}
          title={edit ? "Abort Changes" : "Edit Profile"}
        />
      )}
    </IconContainer>
  );
};

export default IconBar;
