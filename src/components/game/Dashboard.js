import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { api, handleError } from "../../helpers/api";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import OnlineUsers from "./Dashboard/OnlineUsers";
import CreateLobby from "./Dashboard/CreateLobby";
import OpenLobbies from "./Dashboard/OpenLobbies";
import Sidebar from "./Sidebar/Sidebar";

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  > div {
    margin: 1rem;
  }
`;

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
`;

class Dashboard extends React.Component {
  removeLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    this.props.history.push("/login");
  }

  async logout() {
    // set User Offline in Database and remove token
    // if there's an error while trying to do that (e.g. token not found) remove token either way!
    try {
      const requestBody = JSON.stringify({
        token: localStorage.getItem("token")
      });
      await api.put("/logout", requestBody);
      this.removeLocalStorage();
    } catch (error) {
      this.removeLocalStorage();
      console.log(
        `Something went wrong while trying to log out: \n${handleError(error)}`
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Container>
          <BoxContainer>
            <OnlineUsers />
            <OpenLobbies />
            <CreateLobby />
          </BoxContainer>

          <Button
            width="100%"
            onClick={() => {
              this.logout();
            }}
          >
            Logout
          </Button>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(Dashboard);
