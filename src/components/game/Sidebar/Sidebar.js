import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../../../views/Avatar";
import User from "../../shared/models/User";
import DashBoardIcon from "../../../images/Dashboard.png";
import RuleIcon from "../../../images/rules.png";
import RankingIcon from "../../../images/podium_white.png";

const Wrapper = styled.div`
  width: 80px;
  min-height: 100vh;
  height: 100%;
  background-color: #242b45;
  position: absolute;
  left: 0;
  padding: 2rem 0.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 1rem;
`;

const SideBarLink = ({ children, to, title, disabled }) => {
  // returns a link or just the children if link should not work (e.g. while playing the game)
  if (disabled || !to) {
    return children;
  }
  return (
    <Link title={title} to={to}>
      {children}
    </Link>
  );
};

const Sidebar = ({ disabled }) => {
  const user = new User({
    id: localStorage.getItem("userId"),
    username: localStorage.getItem("username")
  });
  if (disabled) {
    return <React.Fragment />;
  } else {
    return (
      <Wrapper>
        <SideBarLink
          to={"/game/dashboard/profile/" + user.id}
          title="To your Profile"
          disabled={disabled}
        >
          <Avatar size={50} user={user} />
        </SideBarLink>
        <SideBarLink to="/game/dashboard" disabled={disabled} title="Dashboard">
          <Icon src={DashBoardIcon} />
        </SideBarLink>

        <SideBarLink to="/game/rules" disabled={disabled} title="Rules">
          <Icon src={RuleIcon} />
        </SideBarLink>

        {
          //Icon made by Freepik from www.flaticon.com
        }
        <SideBarLink to="/game/ranking" disabled={disabled} title="Ranking">
          <Icon src={RankingIcon} />
        </SideBarLink>
      </Wrapper>
    );
  }
};

export default Sidebar;
