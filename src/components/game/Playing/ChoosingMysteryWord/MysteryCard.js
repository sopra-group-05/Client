import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import BigNumber from "./BigNumber";
import { api, handleError } from "../../../../helpers/api";
import { Spinner } from "../../../../views/design/Spinner";
import InformationIcon from "../../../../images/information.png";
import MessageHandler from "../../../../views/MessageHandler";

const CardWrapper = styled.div`
  padding: 0;
  margin: 0;
`;
const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 1rem;
`;

const CardTitle = styled.h4`
  font-size: 1.5rem;
  padding: 0;
  margin: 0 0 1rem 0;
`;

const MysteryWordContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  ${props =>
    props.status === "IN_USE" &&
    "border: 1px solid #ffff00; border-radius: 20px"}
`;

const Information = styled.img`
  width: 20px;
  height: 20px;
  margin: 0.3rem;
`;

const MWText = styled.p`
  font-size: 1.1rem;
  color: ${props => (props.status === "IN_USE" ? "#ffff00" : "#fff")};
`;

class MysteryCard extends React.Component {
  constructor() {
    super();
    this.state = {
      mysteryCard: null,
      error: null
    };
    this.getLobbyMysteryWord = this.getLobbyMysteryWord.bind(this);
  }

  async getLobbyMysteryWord() {
    try {
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.get(
        "/lobbies/" + this.props.match.params.id + "/card"
      );

      // Get the returned mysteryCard and update the state.
      this.setState({ mysteryCard: response.data, error: null });
    } catch (error) {
      this.setState({
        error:
          error && error.response
            ? error.response.data
            : error && error.message
            ? error.message
            : "Unknown error"
      });

      console.log(
        `Something went wrong during loading the mystery card: \n${handleError(
          error
        )}`
      );
    }
  }

  componentDidMount() {
    this.getLobbyMysteryWord();
  }

  render() {
    return (
      <CardWrapper>
        <Card>
          <CardTitle>Mystery Words</CardTitle>
          {this.state.mysteryCard ? (
            this.state.mysteryCard.map(w => {
              return (
                <MysteryWord
                  lobbyLanguage={this.props.lobbyLanguage}
                  lobbyId={this.props.match.params.id}
                  word={w}
                />
              );
            })
          ) : (
            <React.Fragment>
              <MessageHandler
                message={this.state.error}
                show={this.state.error}
              />
              <Spinner />
            </React.Fragment>
          )}
        </Card>
      </CardWrapper>
    );
  }
}

const MysteryWord = ({ lobbyId, word, lobbyLanguage }) => {
  const [definition, setDefinition] = React.useState("");
  const [showPopup, setShowPopup] = React.useState(false);

  const getDefinition = async word => {
    setShowPopup(true);
    if (!definition) {
      // only make API call when there wasn't already one.
      try {
        api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
        const response = await api.get(
          "/lobbies/" + lobbyId + "/definition/" + word
        );

        // set definition ifh there was one
        let def = response.data.results
          ? response.data.results[0].lexicalEntries[0].entries[0].senses[0]
              .definitions[0]
          : "No definition found.";

        // get Definition of active Mystery Word
        setDefinition(def);
      } catch (error) {
        console.log(error);
        setDefinition("No definition found.");
      }
    }
  };

  return (
    <MysteryWordContainer status={word.status}>
      <BigNumber number={word.id} small={true} />
      <MWText status={word.status}>{word.word}</MWText>
      {word.status === "IN_USE" && lobbyLanguage === "EN" && (
        <Information
          src={InformationIcon}
          onClick={() => getDefinition(word.word)}
        />
      )}
      {showPopup && (
        <Popup
          word={word.word}
          definition={definition}
          setShowPopup={setShowPopup}
        />
      )}
    </MysteryWordContainer>
  );
};

const PopupContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupInner = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const PopupContent = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 20px;
  padding: 2rem;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const ClosePopup = styled.button`
  color: red;
  background: transparent;
  padding: 1rem;
  border: none;
`;

const Popup = ({ definition, word, setShowPopup }) => {
  return (
    <PopupContainer>
      <PopupInner>
        <PopupContent>
          <h1>{word}</h1>
          <p>{definition ? definition : <Spinner />}</p>
          <ClosePopup onClick={() => setShowPopup(false)}>Close</ClosePopup>
        </PopupContent>
      </PopupInner>
    </PopupContainer>
  );
};

export default withRouter(MysteryCard);
