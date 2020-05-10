import React from "react";
import styled from "styled-components";
import { api, handleError } from "../../helpers/api";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import { BaseContainer } from "../../helpers/layout";
import Box from "../../views/Box";
import TextInput from "../../views/design/TextInput";
import JO_LOGO from "../../images/JO_LOGO.png";

const Image = styled.img`
  position: relative;
  display: flex;
  width: 50%;
  margin-bottom: -120px;
  margin-left: 240px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const OuterContainer = styled(BaseContainer)`
  padding: 2em;
  width: 40%;
  text-align: center;
`;

const Container = styled(BaseContainer)`
  padding-top: 2em;
  padding-bottom: 2em;
  text-align: center;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10px;
  margin-bottom: 10px;
  color: red;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Register extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      password2: null,
      error: null,
      registered: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */

  async register() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });

      const response = await api.post("/users", requestBody);
      console.log(response.data);

      this.setState({ username: "", password: "", registered: true });
      setTimeout(() => {
        this.setState({ registered: null });
      }, 3500);

      // Register successfully worked --> navigate to the login
      this.props.history.push(`/login`);
    } catch (error) {
      // show error message and make is disappear after 3.5 seconds
      this.setState({
        error: error.response ? error.data : "Error"
      });
      console.log(
        `Something went wrong during the login: \n${handleError(error)}`
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

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
      <OuterContainer>
        <Image src={JO_LOGO} />

        <Box
          title="Create your account"
          titleWidth={"85%"}
          titleAlign={"left"}
          texttrans={"none"}
        >
          <Container>
            {this.state.error ? (
              <ErrorMessage>{this.state.error}</ErrorMessage>
            ) : (
              ""
            )}

            <TextInput
              field="username"
              label="Name"
              placeholder="Enter Name..."
              state={this.state.username}
              handleChange={this.handleInputChange}
            />

            <TextInput
              field="password"
              label="Password"
              placeholder="Enter Password..."
              hiddenText={true}
              state={this.state.password}
              handleChange={this.handleInputChange}
            />

            <TextInput
              field="password2"
              label="Reenter your password"
              placeholder="Enter Password..."
              hiddenText={true}
              state={this.state.password2}
              handleChange={this.handleInputChange}
            />

            <ButtonContainer>
              <Button
                disabled={
                  !this.state.username ||
                  !this.state.password ||
                  this.state.password != this.state.password2
                }
                width="50%"
                onClick={() => {
                  this.register();
                }}
              >
                Register
              </Button>

              <ul> </ul>

              <Button
                width="50%"
                onClick={() => {
                  this.props.history.push(`/login`);
                }}
              >
                Back
              </Button>
            </ButtonContainer>
          </Container>
        </Box>
      </OuterContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Register);
