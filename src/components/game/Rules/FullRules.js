import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { BaseContainer } from "../../../helpers/layout";
import Sidebar from "../Sidebar/Sidebar";
import {Button} from "../../../views/design/Button";

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

class FullRules extends React.Component {
  constructor() {
    super();
    this.state = {
    }

    // bind methods so they can be used in children components when passed down as props
    this.goBack = this.goBack.bind(this);
  }


  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
        <React.Fragment>
          <Sidebar />
          <OuterContainer>
            <ButtonContainer>
              <Button
                  marginbottom="15px"
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
