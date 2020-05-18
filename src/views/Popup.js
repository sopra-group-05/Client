import styled from "styled-components";
import React from "react";

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
  z-index: 10000;
`;

const PopupInner = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  z-index: 10001;
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
  z-index: 10002;
`;

const ClosePopup = styled.button`
  color: red;
  background: transparent;
  padding: 1rem;
  border: none;
  z-index: 10003;
`;

const Popup = ({ children, setShowPopup }) => {
  return (
    <PopupContainer>
      <PopupInner>
        <PopupContent>
          {children}
          <ClosePopup onClick={() => setShowPopup(false)}>Close</ClosePopup>
        </PopupContent>
      </PopupInner>
    </PopupContainer>
  );
};

export default Popup;
