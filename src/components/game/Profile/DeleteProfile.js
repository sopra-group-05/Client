import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../../helpers/layout";
import Avatar from "../../../views/Avatar";
import Box from "../../../views/Box";
import { Button } from "../../../views/design/Button";
import { Spinner } from "../../../views/design/Spinner";
import { api, handleError } from "../../../helpers/api";
import TextInput from "../../../views/design/TextInput";
import MessageHandler from "../../../views/MessageHandler";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 70%;
  margin-top: 3em;
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

class DeleteProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      user: null,
      error: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * HTTP DELETE request is sent to the backend.
   * If the request is successful, the user will be deleted
   * and the user will be directed to the login/register page.
   */
  async deleteUser() {
    try {
      const requestBody = JSON.stringify({
        password: this.state.password
      });
      const response = await api.delete("/users/" + this.props.user.id, {
        data: requestBody
      });

      // Delete successfully worked --> navigate to the login page
      this.props.handleLogout();
    } catch (error) {
      console.log(error.response);
      this.setState({
        error:
          error && error.response
            ? error.response.data
            : error && error.message
            ? error.message
            : "Unknown error"
      });
      //      setTimeout(() => {`
      //        this.setState({ error: null });
      //      }, 3500);
      console.log(
        `Something went wrong during the deletion: \n${handleError(error)}`
      );
    }
  }

  async logout() {
    // set User Offline in Database and remove token
    // if there's an error while trying to do that (e.g. token not found) remove token either way!
    try {
      const requestBody = JSON.stringify({
        token: localStorage.getItem("token")
      });
      await api.put("/logout", requestBody);
      this.props.handleLogout();
    } catch (error) {
      this.props.handleLogout();
      console.log(
        `Something went wrong while trying to log out: \n${handleError(error)}`
      );
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  componentDidMount() {
    this.setState({
      user: this.props.user
    });
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.user ? (
          <Spinner />
        ) : (
          <OuterContainer>
            <Box title={this.state.user.username}>
              <Container>
                <MessageHandler
                  show={this.state.error}
                  message={this.state.error}
                />
                <Avatar user={this.state.user} />

                <ButtonContainer>
                  <TextInput
                    field="password"
                    label="In order to delete your profile please enter your password. This deletion is final if you don't want to delete your profile go back."
                    placeholder="Enter Password..."
                    hiddenText={true}
                    state={this.state.password}
                    handleChange={this.handleInputChange}
                  />

                  <Button
                    marginbottom="15px"
                    colorDef={"#3b85ff"}
                    onClick={() => {
                      this.deleteUser();
                    }}
                  >
                    Delete Profile
                  </Button>

                  <Button
                    onClick={() => {
                      this.props.handleDelete();
                    }}
                  >
                    Back
                  </Button>
                </ButtonContainer>
              </Container>
            </Box>
          </OuterContainer>
        )}
      </React.Fragment>
    );
  }
}

export default DeleteProfile;
