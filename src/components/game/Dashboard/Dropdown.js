import React from "react";
import styled from "styled-components";

const DropDownContent = styled.div`
  display: none;
  padding-top: 0rem;
  border-radius: 0px 0px 20px 20px;
  position: absolute;
  min-width: 100px;
  background-color: rgb(0, 0, 0, 0.9);
  margin-top: 0rem;
  margin-left: -1rem;
  z-index: 1;
`;

const DropDownMenue = styled.ul`
  list-style-type: none;
  border-radius: 20px;
  background-color: rgb(0, 0, 0, 0.2);
  padding: 1rem;
  margin: 0rem 0rem 0rem 1rem;
  cursor: pointer;
  min-width: 100px;
  text-align: center;
  align-items: center;
  &:hover ${DropDownContent} {
    display: block;
  }
`;

const DropDownPoint = styled.a`
  color: white;
  padding: 1rem;
  text-decoration: none;
  min-width: 100px;
  display: block;
  border-radius: 20px;
  text-align: center;
  &:hover {
    background-color: rgba(125, 66, 139, 1);
    color: white;
  }
`;

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Select #"
    };
  }

  handleClick(name) {
    this.setState({ selected: name });
    this.props.changeNumOfBots(
      name == "1 Bot" ? 1 : name == "2 Bots" ? 2 : name == "3 Bots" ? 3 : 1
    );
  }

  render = () => {
    return (
      <DropDownMenue>
        {this.state.selected}
        <DropDownContent>
          <DropDownPoint onClick={() => this.handleClick("1 Bot")}>
            1 Bot
          </DropDownPoint>
          <DropDownPoint onClick={() => this.handleClick("2 Bots")}>
            2 Bots
          </DropDownPoint>
          <DropDownPoint onClick={() => this.handleClick("3 Bots")}>
            3 Bots
          </DropDownPoint>
        </DropDownContent>
      </DropDownMenue>
    );
  };
}

export default Dropdown;
