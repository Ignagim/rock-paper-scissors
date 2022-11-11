import styled from "styled-components";

const TokenStyled = styled.div`
  width: 130px;
  height: 125px;
  border: 16px solid ${({ color }) => color.base};
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ name }) => (name === "default" ? "#122343" : "#fff")};
  box-shadow: 0 5px 0px ${({ color }) => color.border};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ isShadowAnimated, color }) =>
    isShadowAnimated &&
    `box-shadow: 0 5px 0px ${color.border},0 0 20px 40px rgba(255, 255, 255, 0.08), 0 0 20px 80px rgba(255, 255, 255, 0.05), 0 0 20px 120px rgba(255, 255, 255, 0.03); transition: box-shadow 1s ease-in-out;`};

  &:active {
    transform: scale(0.9);
  }

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 -4px 0px ${({ name }) => (name === "default" ? "transparent" : "#bbc0d5")};
    flex: 1;
    align-self: stretch;
    border-radius: 50%;
  }

  @media screen and (min-width: 768px) {
    width: 200px;
    height: 195px;

    &:hover {
      ${({ playing, color }) =>
        !playing &&
        `
      box-shadow: 0 5px 0 ${color.border}, 0 0 20px 40px rgba(255, 255, 255, 0.08);
      transform: scale(0.95);
      `}
    }
  }
`;

const colors = {
  paper: {
    base: "#516ef4",
    border: "#2543c3",
  },
  rock: { base: "#de3a5a", border: "#980e31" },
  scissors: { base: "#eca81e", border: "#c76c14" },
  default: { base: "transparent", border: "transparent" },
};

function Token({
  name = "default",
  img = "",
  onClick,
  isShadowAnimated = false,
  playing,
}) {
  const handleClick = () => {
    if (onClick) {
      onClick(name, img);
    }
  };

  const color = colors[name] ? colors[name] : colors.default;

  return (
    <TokenStyled
      color={color}
      onClick={handleClick}
      name={name}
      isShadowAnimated={isShadowAnimated}
      playing={playing}
    >
      <div className="box">{img && <img src={img} alt="token" />}</div>
    </TokenStyled>
  );
}

export default Token;
