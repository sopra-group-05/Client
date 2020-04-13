import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../../helpers/layout";
import Avatar from "../../../views/Avatar";
import Box from "../../../views/Box";
import { Button } from "../../../views/design/Button";
import {Spinner} from "../../../views/design/Spinner";
import ShowProfile from "./ShowProfile";
import {api, handleError} from "../../../helpers/api";
import User from "../../shared/models/User";
import TextInput from "../../../views/design/TextInput";

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
      password: null,
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

      const response = await api.delete("/users/" + this.props.user.id);

      // Delete successfully worked --> navigate to the login page
      this.props.history.push(`/login`);
    } catch (error) {
      this.setState({
        error: error.response ? error.response.data : "Error"
      });
      //      setTimeout(() => {
      //        this.setState({ error: null });
      //      }, 3500);
      console.log(
          `Something went wrong during the deletion: \n${handleError(error)}`
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
          {!this.state.user ? <Spinner/> :(
              <OuterContainer>
                <Box title={this.state.user.username}>
                  <Container>
                      {this.state.error ? (
                          <ErrorMessage>{this.state.error.message}</ErrorMessage>
                      ) : (
                          ""
                      )}

                    <Avatar user={this.state.user}/>



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
    )
  }
}

export default DeleteProfile;