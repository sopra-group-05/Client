import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { BaseContainer } from "../../../helpers/layout";
import Sidebar from "../Sidebar/Sidebar";
import { Button } from "../../../views/design/Button";
import GameRules from "../../../images/GameRules.jpg";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 25%;
  margin-top: 2em;
  margin-bottom: 5em;
`;

const OuterContainer = styled(BaseContainer)`
  padding-top: 3em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  align-items: center;
`;

const Image = styled.img`
  width: 90%;
  border-radius: 30px;
`;

class FullRules extends React.Component {
  constructor() {
    super();
    this.state = {};

    // bind methods so they can be used in children components when passed down as props
    this.goBack = this.goBack.bind(this);
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {}

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <React.Fragment>
        <Sidebar />
        <OuterContainer>
          <Image src={GameRules} />
          <ButtonContainer>
            <Button
              colorDef={"#3b85ff"}
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              Back
            </Button>
          </ButtonContainer>
        </OuterContainer>
      </React.Fragment>
    );
  }
}

export default withRouter(FullRules);
