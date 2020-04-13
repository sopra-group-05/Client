import { Button } from "../../../views/design/Button";
import React from "react";
import styled from "styled-components";
import { api, handleError } from "../../../helpers/api";
import MessageHandler from "../../../views/MessageHandler";
import {Spinner} from "../../../views/design/Spinner";
import Box from "../../../views/Box";
import Avatar from "../../../views/Avatar";
import {BaseContainer} from "../../../helpers/layout";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 70%;
  margin-top: 5em;
  margin-bottom: 1.5em;
  padding: 0.5em;
`;



const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
    font-style: italic;
  }
  border: none;
  background: #454c62;
  border-radius: 20px;
  padding: 1rem 2rem 1rem 2rem;
  color: rgba(255, 255, 255, 0.8);
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #242b45;
  border-radius: 20px;
  min-height: 100px;
  margin: -25px 0 0 0;
  padding: 2.5rem 1rem 1rem 1rem;
  color: #fff;
  align-items: center;
`;

const OuterContainer = styled(BaseContainer)`
  padding-top: 3em;
  width: 27%;
  text-align: center;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10px;
  margin-bottom: 10px;
`;

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      userNameBackup: null,
      username:null,
      error: null
    };
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  componentDidMount() {
    this.setState({
      user: this.props.user
    });
  }

  async edit() {
    if (
      this.state.username === this.props.user.username &&
      this.state.birthday === this.props.user.birthday
    ) {
      // just change to the Profile again if there were no changes
      this.props.profileUpdated();
    } else {
      this.state.userNameBackup = this.state.user.username;
      try {
        this.state.user.username = this.state.username;
        const requestBody = JSON.stringify({
          user: this.state.user
        });
        api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
        await api.put("/users/" + this.props.user.id, requestBody);

        // Get the changed Data, change back to Profile-View and show Profile Updated Message
        this.props.profileUpdated();
      } catch (error) {
        this.state.user.username = this.state.userNameBackup;
        this.setState({
          error: error.response.data ? error.response.data : "Error"
        });
        console.log(
          `Something went wrong during when trying to update the profile: \n${handleError(
            error
          )}`
        );
      }
    }
  }

  render() {
    return (
        <React.Fragment>
          {!this.state.user ? <Spinner/> :(
            <OuterContainer>
              <InputField
                placeholder={"Enter new Name here..."}
                onChange={e => {
                  this.handleInputChange("username", e.target.value);
                }}/>
              <Container>
                {this.state.error ? (
                    <ErrorMessage>{this.state.error}</ErrorMessage>
                ) : (
                    ""
                )}
                <Avatar user={this.state.user}/>

                <ButtonContainer>
                  <Button marginbottom="30px" colorDef={"#454c62"}>
                    Level
                  </Button>

                  <Button
                      marginbottom="15px"
                      colorDef={"#3b85ff"}
                      onClick={() => {
                        this.edit();
                      }}
                  >
                    Save Change
                  </Button>

                  <Button
                      onClick={() => {
                        this.props.handleEdit();
                      }}
                  >
                    Back
                  </Button>
                </ButtonContainer>
              </Container>
            </OuterContainer>
            )}
        </React.Fragment>
    )
  }


}

export default EditProfile;
