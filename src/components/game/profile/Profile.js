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
import Sidebar from "../Sidebar/Sidebar";
import abortIcon from "../../../images/abort.png";
import editUserIcon from "../../../images/edit_user_icon.png";
import Box from "../../../views/Box"
import {Button} from "../../../views/design/Button"

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;
  width:70%;
  margin-top: 5em;
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
  width: 50%;
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
    }
    catch (error) {
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
          {!this.state.user ? <Spinner/> : (

            <OuterContainer>

              <Box title={this.state.user.username} >
                <Container>
                  {this.state.error ? (<ErrorMessage>{this.state.error}</ErrorMessage>) : ""}

                  <Avatar user={this.state.user}/>

                  <ButtonContainer>

                    <Button
                      marginbottom="30px"
                      colorDef={"#454c62"}>
                      Level
                    </Button>

                    {this.state.user.id === parseInt(localStorage.getItem("userId")) && (
                      <Button
                          marginbottom="10px"
                          colorDef={"#3b85ff"}
                          onClick={() => {this.props.history.push(`/game/editProfile`);}}>
                        Edit Profile
                      </Button>
                    )}

                    <Button
                      colorDef={"red"}
                      onClick={() => {this.props.history.goBack();}}>
                      Back
                    </Button>

                  </ButtonContainer>
                </Container>
              </Box>
            </OuterContainer>)}
        </React.Fragment>
      );
    }
}







          /*

           {         <Container>
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
                </React.Fragment>
              );}
  }
}
*/
export default withRouter(Profile);
