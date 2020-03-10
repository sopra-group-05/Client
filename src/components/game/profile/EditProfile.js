import { Button } from "../../../views/design/Button";
import React from "react";
import styled from "styled-components";
import { api, handleError } from "../../../helpers/api";
import MessageHandler from "../../../views/MessageHandler";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.6);
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 200px;
  width: 100%;
  font-size: 16px;
  font-weight: 300;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: rgba(0, 0, 0, 0.7);
`;

const ProfileInfo = styled.div`
  width: 100%;
`;

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      birthday: null,
      id: null,
      error: null
    };
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  componentDidMount() {
    this.setState({
      username: this.props.user.username,
      birthday: this.props.user.birthday,
      id: this.props.user.id
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
      try {
        const requestBody = JSON.stringify({
          username: this.state.username,
          birthday: this.state.birthday,
          id: this.state.id
        });
        api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
        await api.put("/users/" + this.props.user.id, requestBody);

        // Get the changed Data, change back to Profile-View and show Profile Updated Message
        this.props.profileUpdated();
      } catch (error) {
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
      <ProfileInfo>
        <h2>Edit your Profile</h2>
        <Form>
          <MessageHandler
            message={this.state.error}
            show={this.state.error}
            success={false}
          />
          <Label>Username</Label>
          <InputField
            placeholder="Enter here.."
            value={this.state.username}
            onChange={e => {
              this.handleInputChange("username", e.target.value);
            }}
          />
          <Label>Birthday</Label>
          <InputField
            placeholder="Enter here.."
            type="date"
            value={this.state.birthday}
            onChange={e => {
              this.handleInputChange("birthday", e.target.value);
            }}
          />
          <ButtonContainer>
            <Button
              disabled={!this.state.username}
              width="50%"
              onClick={() => {
                this.edit();
              }}
            >
              Save
            </Button>
          </ButtonContainer>
        </Form>
      </ProfileInfo>
    );
  }
}

export default EditProfile;
