import React from "react";
import styled from "styled-components";
import Label from "./Label";

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-style: italic;
  }
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.8);
`;

const Wrapper = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
`;

const TextInput = ({ field, label, state, handleChange, placeholder, hiddenText, labelAlign }) => {
    const placeHolderText = placeholder ? placeholder : "Enter here...";
    const fieldType = hiddenText ? "password": "text";
    const labelAlignment = labelAlign ? labelAlign : "left";
    return (
    <Wrapper>
      <Label style={{textAlign:labelAlignment}}>{label}</Label>
      <InputField
        placeholder= {placeHolderText}
        value={state}
        type = {fieldType}

        onChange={e => {
          handleChange(field, e.target.value);
        }}
      />
    </Wrapper>
  );
};

export default TextInput;
