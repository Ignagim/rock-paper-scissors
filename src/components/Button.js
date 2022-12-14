import styled from "styled-components";

const ButtonStyled = styled.div`
  display: inline-flex;
  border: 1px solid #fff;
  border-radius: 0.5em;
  min-width: 128px;
  padding: 0.7em;
  box-sizing: border-box;
  justify-content: center;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-family: "Barlow Semi Condensed";

  :hover {
    background-color: #fff;
    color: #101a3f;
  }
`;

function Button({ children, ...props }) {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
}

export const WhiteButton = styled(ButtonStyled)`
  background-color: #fff;
  color: #101a3f;
  min-width: 220px;
`;

export default Button;
