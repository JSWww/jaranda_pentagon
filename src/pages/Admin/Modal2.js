import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import UserCreate from "components/UserCreate";

const ModalStyle = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid grey;
`;

const ModalInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 95%;
  border-radius: 10px;
`;

const ModalInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalBtnBox = styled.div`
`;

const ModalBtn = styled.button`
`;

function Modal2({ setIsShown }) {

  const handleModalClose = () => setIsShown(false);

  return ReactDOM.createPortal(
    <ModalStyle>
      <ModalInputBox>
        <ModalInput>
          <ModalBtnBox>
            <ModalBtn onClick={handleModalClose}>X</ModalBtn>
          </ModalBtnBox>
          <UserCreate setIsShown={setIsShown}/>
        </ModalInput>
      </ModalInputBox>
    </ModalStyle>,
    document.getElementById("modal-root")
  );
}

Modal2.propTypes = {
  setIsShown: PropTypes.func,
};

export default Modal2;