import React from "react";
import styled from "styled-components";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import { BaseContainer } from "../../../helpers/layout";
import User from "../../shared/models/User";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import Avatar from "../../../views/Avatar";
import IconBar from "./IconBar";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";

const Container = styled(BaseContainer)`
  color: black;
  a {
    display: block;
    width: 100%;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileContent = styled.div`
  margin-left: 1rem;
`;

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      edit: false,
      changedMsg: null
    };

    // bind methods so they can be used in children components when passed down as props
    this.handleEdit = this.handleEdit.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.profileUpdated = this.profileUpdated.bind(this);
  }

  handleEdit() {
    // change between Profile and edit Profile View
    this.setState(state => ({
      edit: !state.edit
    }));
  }

  profileUpdated() {
    // Get the changed Data, change back to Profile-View and show Profile Updated Message
    this.getProfile();
    this.handleEdit();
    this.setState({ changedMsg: true });
    setTimeout(() => {
      this.setState({ changedMsg: null });
    }, 3500);
  }

  async getProfile() {
    // fetch Profile
    try {
      this.setState({ user: null });

      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get("/users/" + this.props.match.params.id);
      // Get the returned users and update the state.
      const user = new User(response.data);
      // show Spinner before Updating State
      await new Promise(resolve => setTimeout(resolve, 250));
      this.setState({ user: user });
      console.log(response);
    } catch (error) {
      alert(
        `Something went wrong while fetching the user: \n${handleError(error)}`
      );
    }
  }

  componentDidMount() {
    this.getProfile();
  }

  render() {
    return (
      <BaseContainer>
        <Container>
          {this.state.user ? (
            <React.Fragment>
              <IconBar
                user={this.state.user}
                edit={this.state.edit}
                handleEdit={this.handleEdit}
              />
              <MessageHandler
                message="Profile Updated"
                success={true}
                show={this.state.changedMsg && !this.state.edit}
              />
              <ProfileContainer>
                <Avatar user={this.state.user} />
                <ProfileContent>
                  {this.state.edit ? (
                    <EditProfile
                      user={this.state.user}
                      profileUpdated={this.profileUpdated}
                    />
                  ) : (
                    <ShowProfile user={this.state.user} />
                  )}
                </ProfileContent>
              </ProfileContainer>
            </React.Fragment>
          ) : (
            <Spinner />
          )}
        </Container>
      </BaseContainer>
    );
  }
}

export default withRouter(Profile);
