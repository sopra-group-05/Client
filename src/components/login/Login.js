import React from "react";
import styled from "styled-components";
import { api, handleError } from "../../helpers/api";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import { BaseContainer } from "../../helpers/layout";

const FormContainer = styled.div`
  padding-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
  font-family: "Caveat", cursive;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #7d428b;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  font-size: 16px;
  font-weight: 300;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
  transition: opacity 0.5s ease, transform 0.5s ease;
  padding: 37px;
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

const Label = styled.label`
  margin-bottom: 10px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.6);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  display: flex;
  width: 100%;
  color: red;
  font-size: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const RegisterMessage = styled.div`
  display: flex;
  width: 100%;
  color: green;
  font-size: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
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
class Login extends React.Component {
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
      error: null,
      registered: null
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async login() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });

      const response = await api.put("/login", requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user.id);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      this.props.history.push(`/game`);
    } catch (error) {
      this.setState({
        error: error.response ? error.response.data : "Error"
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 3500);
      console.log(
        `Something went wrong during the login: \n${handleError(error)}`
      );
    }
  }

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
    } catch (error) {
      // show error message and make is disappear after 3.5 seconds
      this.setState({
        error: error.response ? error.response.data : "Error"
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 3500);
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
      <BaseContainer>
        <FormContainer>
          <Form>
            <Title>Group 05</Title>
            {this.state.error && (
              <ErrorMessage>{this.state.error}</ErrorMessage>
            )}
            {this.state.registered && (
              <RegisterMessage>
                Registration completed. Let's Play!
              </RegisterMessage>
            )}
            <Label>Username</Label>
            <InputField
              placeholder="Enter here.."
              value={this.state.username}
              onChange={e => {
                this.handleInputChange("username", e.target.value);
              }}
            />
            <Label>Password</Label>
            <InputField
              placeholder="Enter here.."
              type="password"
              value={this.state.password}
              onChange={e => {
                this.handleInputChange("password", e.target.value);
              }}
            />
            <ButtonContainer>
              <Button
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </Button>
              <Button
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.register();
                }}
              >
                Register new User
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
