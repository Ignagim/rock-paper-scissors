import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import RulesImg from "../assets/image-rules.svg";
import IconClose from "../assets/icon-close.svg";

const RulesStyled = styled.div`
  text-align: center;

  &::before {
    content: "";
    display: ${({ visible }) => (visible ? "block" : "none")};
    z-index: 50;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .close-button {
    margin-top: 2em;
    cursor: pointer;
  }

  .rules-modal {
    padding: 4em 0;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform: translateY(200%);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    transition: all 0.4s ease-in-out;
    h2 {
      color: #3b4262;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 1em;
    }
  }

  .active {
    transform: translate(0%);
  }

  @media screen and (min-width: 768px) {
    .button {
      position: fixed;
      right: 2em;
      bottom: 2em;
    }
    .rules-modal {
      width: 400px;
      margin: auto;
      top: 0;
      bottom: initial;
      transform: translateY(200%);
      border-radius: 20px;
      padding: 2em;
      box-sizing: border-box;
      h2 {
        margin: 0;
        font-size: 32px;
        align-self: flex-start;
        margin: 0 0 1.2em 0;
      }
    }

    .active {
      transform: translateY(calc(50vh - 160px));
    }
    .close-button {
      position: absolute;
      right: 2em;
      top: 0.8em;
    }
  }
`;

function Rules() {
  const [visible, setVisible] = useState(false);

  if (visible) {
    window.onscroll = function () {
      window.scrollTo(0, 0);
    };
  } else {
    window.onscroll = function () {};
  }

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <RulesStyled visible={visible}>
      <div className={`rules-modal ${visible && "active"}`}>
        <h2>Rules</h2>
        <img src={RulesImg} alt="Game Rules" />
        <img
          className="close-button"
          onClick={handleClick}
          src={IconClose}
          alt="Icon Close"
        />
      </div>

      <Button onClick={handleClick} className="button">
        Rules
      </Button>
    </RulesStyled>
  );
}

export default Rules;
