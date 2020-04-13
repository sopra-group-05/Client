import React from "react";
import styled from "styled-components";
import { api, handleError } from "../../../helpers/api";
import { withRouter } from "react-router-dom";
import { BaseContainer } from "../../../helpers/layout";
import User from "../../shared/models/User";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import { Spinner } from "../../../views/design/Spinner";
import Sidebar from "../Sidebar/Sidebar";
import DeleteProfile from "./DeleteProfile";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;
  width: 70%;
  margin-top: 5em;
`;

const ExtraButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OuterContainer = styled(BaseContainer)`
  padding-top: 3em;
  width: 27%;
  text-align: center;
`;

const Container = styled(BaseContainer)`
  display: flex;
  flex-direction: column;
  padding-top: 2em;
  padding-bottom: 2em;
  align-items: center;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10px;
  margin-bottom: 10px;
`;

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      edit: false,
      delete: false,
      changedMsg: null
    };

    // bind methods so they can be used in children components when passed down as props
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.profileUpdated = this.profileUpdated.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleEdit() {
    // change between Profile and edit Profile View
    this.setState(state => ({
      edit: !state.edit,
      delete: false
    }));
  }

  handleDelete() {
    // change between Profile and edit Profile View
    this.setState(state => ({
      edit: false,
      delete: !state.delete
    }));
  }

  goBack() {
    this.props.history.goBack();
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
      <React.Fragment>
        <Sidebar />
        {!this.state.user ? (
          <OuterContainer>
            <Spinner />
          </OuterContainer>
        ) : (
          <div>
            {this.state.delete ? (
              <DeleteProfile
                user={this.state.user}
                handleDelete={this.handleDelete}
              />
            ) : (
              <div>
                {this.state.edit ? (
                  <EditProfile
                    user={this.state.user}
                    handleEdit={this.handleEdit}
                    profileUpdated={this.profileUpdated}
                  />
                ) : (
                  <ShowProfile
                    user={this.state.user}
                    handleEdit={this.handleEdit}
                    goBack={this.goBack}
                    handleDelete={this.handleDelete}
                  />
                )}{" "}
              </div>
            )}{" "}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Profile);
