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

const DropDownMenu = styled.ul`
  list-style-type: none;
  border-radius: 20px;
  background-color: rgb(0, 0, 0, 0.2);
  padding: 1rem;
  cursor: pointer;
  width: 200px;
  text-align: center;
  align-items: center;
  margin: 0;
  &:hover ${DropDownContent} {
    display: block;
  }
`;

const DropDownPoint = styled.a`
  color: white;
  padding: 1rem;
  text-decoration: none;
  width: 200px;
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
      selected: "Normal (13)"
    };
  }

  /*	
	handleClick = action => {
    if (!action) return;

    if (this.props.onClick) this.props.onClick(action);
  };
*/

  handleClick(name) {
    this.setState({ selected: name });
    this.props.changeNumOfCards(
      name == "Demo (1)"
        ? 1
        : name == "Speed (7)"
        ? 7
        : name == "Normal (13)"
        ? 13
        : name == "Stay@Home (21)"
        ? 21
        : 13
    );
  }

  render = () => {
    return (
      <DropDownMenu>
        {this.state.selected}
        <DropDownContent>
          <DropDownPoint onClick={() => this.handleClick("Demo (1)")}>
            Demo (1)
          </DropDownPoint>
          <DropDownPoint onClick={() => this.handleClick("Speed (7)")}>
            Speed (7)
          </DropDownPoint>
          <DropDownPoint onClick={() => this.handleClick("Normal (13)")}>
            Normal (13)
          </DropDownPoint>
          <DropDownPoint onClick={() => this.handleClick("Stay@Home (21)")}>
            Stay@Home (21)
          </DropDownPoint>
        </DropDownContent>
      </DropDownMenu>
    );
  };
}

export default Dropdown;
