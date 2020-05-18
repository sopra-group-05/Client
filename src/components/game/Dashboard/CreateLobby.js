import React from "react";
import styled from "styled-components";
import { handleError, api } from "../../../helpers/api";
import MessageHandler from "../../../views/MessageHandler";
import { Spinner } from "../../../views/design/Spinner";
import Box from "../../../views/Box";
import TextInput from "../../../views/design/TextInput";
import Diamond from "../../../images/Diamond.png";
import GermanFlag from "../../../images/lang_DE.png";
import EnglishFlag from "../../../images/lang_EN.png";
import Label from "../../../views/design/Label";
import Dropdown from "./Dropdown";
import DropdownCards from "./DropdownCards";
import Lobby from "../../shared/models/Lobby";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  text-align: center;
`;

const Circle = styled.div`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  border: 8px solid #ffcf10;
  text-align: center;
  margin: 1.5rem auto;
`;

const GameRank = styled.p`
  color: #7785b4;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0;
  margin: 0;
`;

const Score = styled.p`
  color: #fff;
  margin: 0;
  padding: 0;
`;

const DiamondIcon = styled.img`
  margin-left: 0.3rem;
  width: 15px;
  height: 15px;
`;

const GameMode = styled.div`
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: inline-flex;
  cursor: pointer;
`;

const CheckBox = styled.div`
  height: 25px;
  width: 25px;
  background: #353a49;
  border-radius: 25%;
  display: block;
  margin-right: 0.75rem;
`;

const CheckboxTick = styled.div`
  visibility: ${props => (props.checked ? "visible" : "hidden")};
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 25%;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(45deg);
  :before {
    content: "";
    position: absolute;
    width: 5px;
    height: 12px;
    background-color: #3bff65;
    left: 12px;
    top: 6px;
  }
  :after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #3bff65;
    left: 8px;
    top: 13px;
  }
`;

const Languages = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
`;

const Cards = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Flag = styled.img`
  opacity: ${props => (props.active ? "1.0" : "0.5")};
  height: 42px;
  width: 42px;
  cursor: pointer;
  transition: opacity 0.25s ease;
`;

const Button = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  border-radius: 15px;
  background-color: #3b85ff;
  color: #fff;
  display: block;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  cursor: pointer;
`;

const BotContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1rem;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1rem;
`;

class CreateLobby extends React.Component {
  constructor() {
    super();
    this.state = {
      score: null,
      lobbyName: localStorage.getItem("username") + " Lobby",
      language: "EN",
      gameMode: 0,
      error: null,
      numberOfCards: 13,
      numberOfBots: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeNumberOfCards = this.changeNumberOfCards.bind(this);
    this.changeNumberOfBots = this.changeNumberOfBots.bind(this);
  }
  componentDidMount() {
    // get Game-Score of current player, dummy score at the moment
    //this.getScore();
    this.setState({ score: 4280 });
  }

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  changeLanguage(languageCode) {
    this.setState({ language: languageCode });
    if (languageCode === "DE") {
      this.setState({ gameMode: 0 });
    }
  }

  toggleCheckbox() {
    this.setState({ gameMode: this.state.gameMode === 0 ? 1 : 0 });
    this.state.gameMode == 0
      ? this.setState({ numberOfBots: 1 })
      : this.setState({ numberOfBots: 0 });
  }

  changeNumberOfCards(numOfCards) {
    this.setState({ numberOfCards: numOfCards });
  }

  changeNumberOfBots(numOfBots) {
    this.setState({ numberOfBots: numOfBots });
  }

  async createLobby() {
    try {
      const requestBody = JSON.stringify({
        lobbyName: this.state.lobbyName,
        gameMode: this.state.gameMode,
        language: this.state.language,
        numberOfCards: this.state.numberOfCards,
        numberOfBots: this.state.numberOfBots
      });
      api.defaults.headers.common["Token"] = localStorage.getItem("token"); // set token to be allowed to request
      const response = await api.post("/lobbies", requestBody);
      console.log(response.data);
      const lobby = new Lobby(response.data);
      console.log(lobby);

      this.props.history.push("/game/lobby/" + lobby.id);
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
        `Something went wrong during the creation of a new lobby: \n${handleError(
          error
        )}`
      );
    }
  }

  render() {
    return (
      <Box title="new Game">
        {!this.state.score ? (
          !this.state.error && <Spinner />
        ) : (
          <Container>
            <Circle>
              <GameRank>GAME RANK</GameRank>
              <Score>
                {this.state.score}
                <DiamondIcon src={Diamond} />
              </Score>
            </Circle>
            <TextInput
              field="lobbyName"
              label="Name of lobby"
              state={this.state.lobbyName}
              labelAlign={"center"}
              handleChange={this.handleInputChange}
            />
            {this.state.language === "EN" && (
              <BotContainer>
                <GameMode onClick={() => this.toggleCheckbox()}>
                  <CheckBox>
                    <CheckboxTick checked={this.state.gameMode === 1} />
                  </CheckBox>
                  Add Bots
                </GameMode>
                {!(this.state.gameMode === 0) ? (
                  <Dropdown changeNumOfBots={this.changeNumberOfBots} />
                ) : (
                  ""
                )}
              </BotContainer>
            )}
            <Label>Select Lobby Language</Label>
            <Languages>
              <Flag
                src={EnglishFlag}
                active={this.state.language === "EN"}
                onClick={() => this.changeLanguage("EN")}
                title="English"
              />
              <Flag
                src={GermanFlag}
                active={this.state.language === "DE"}
                onClick={() => this.changeLanguage("DE")}
                title="German"
              />
            </Languages>

            <Label style={{ marginTop: "1rem" }}>Select # of Cards </Label>
            <Cards>
              <DropdownCards changeNumOfCards={this.changeNumberOfCards} />
            </Cards>
            <Button
              onClick={() => {
                this.createLobby();
              }}
            >
              Create Lobby
            </Button>
            <MessageHandler
              success={false}
              show={this.state.error}
              message={this.state.error}
            />
          </Container>
        )}
      </Box>
    );
  }
}

export default withRouter(CreateLobby);
