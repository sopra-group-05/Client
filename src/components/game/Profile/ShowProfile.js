import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../../helpers/layout";
import Avatar from "../../../views/Avatar";
import Box from "../../../views/Box";
import { Button } from "../../../views/design/Button";
import { Spinner } from "../../../views/design/Spinner";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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

class ShowProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
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
                {this.state.error ? (
                  <ErrorMessage>{this.state.error}</ErrorMessage>
                ) : (
                  ""
                )}

                <Avatar user={this.state.user} />

                <ButtonContainer>
                  <Button marginbottom="30px" colorDef={"#454c62"}>
                    Score: {this.state.user.score}
                  </Button>

                  {this.state.user.id ===
                  parseInt(localStorage.getItem("userId")) ? (
                    <ExtraButtonContainer>
                      <Button
                        marginbottom="15px"
                        colorDef={"#3b85ff"}
                        onClick={() => {
                          this.props.handleEdit();
                        }}
                      >
                        Edit Profile
                      </Button>

                      <Button
                        marginbottom="15px"
                        colorDef={"red"}
                        onClick={() => {
                          this.props.handleDelete();
                        }}
                      >
                        Delete Profile
                      </Button>
                    </ExtraButtonContainer>
                  ) : (
                    ""
                  )}

                  <Button
                    onClick={() => {
                      this.props.goBack();
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

export default ShowProfile;
