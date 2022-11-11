import styled from "styled-components";
import Token from "./Token";
import PaperImg from "../assets/icon-paper.svg";
import RockImg from "../assets/icon-rock.svg";
import ScissorsImg from "../assets/icon-scissors.svg";
import bgImg from "../assets/bg-triangle.svg";
import { useContext, useState } from "react";
import { WhiteButton } from "./Button";
import { ScoreContext } from "../App";

const TableStyled = styled.div`
  display: grid;
  grid-template-columns: 130px 130px;
  justify-content: center;
  justify-items: center;
  grid-gap: 30px 50px;
  margin: 2em 0;
  background: ${({ playing }) =>
    !playing ? `url(${bgImg}) center no-repeat` : "none"};
  background-size: 250px;

  & div:nth-of-type(3) {
    grid-column: span 2;
  }

  .in-game {
    text-align: center;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 700;
    letter-spacing: 2px;
  }

  .results {
    text-align: center;
    h2 {
      text-transform: uppercase;
      font-size: 56px;
      margin: 10px;
    }
  }

  @media screen and (min-width: 1024px) {
    /* grid-gap: 30px 140px; */
    grid-template-columns: 200px 200px;
    ${({ playing, results }) =>
      playing &&
      results !== "" &&
      "grid-template-columns: 200px 110px 110px 200px;"};

    & div:nth-of-type(3) {
      ${({ playing, results }) =>
        playing && results !== "" && " grid-column: 2 / 4; grid-row: 1;"}
    }

    .results {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .in-game {
      font-size: 1.2em;
      display: flex;
      flex-direction: column-reverse;
      p {
        margin-bottom: 2em;
      }
    }
  }
`;

const elements = [
  { name: "paper", img: PaperImg },
  { name: "scissors", img: ScissorsImg },
  { name: "rock", img: RockImg },
];

function Table() {
  const [playing, setPlaying] = useState(false);
  const [results, setResults] = useState("");
  const [housePick, setHousePick] = useState({
    name: "",
    img: "",
  });
  const [pick, setPick] = useState({
    name: "",
    img: "",
  });

  const { score, setScore } = useContext(ScoreContext);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const launchHousePick = () => {
    return new Promise((resolve, reject) => {
      let pick;
      const interval = setInterval(() => {
        pick = elements[getRandomInt(0, 3)];
        setHousePick({ ...housePick, name: pick.name, img: pick.img });
      }, 75);
      setTimeout(() => {
        clearInterval(interval);
        resolve(pick);
      }, 1000);
    });
  };

  const onClick = async (name, img) => {
    setPlaying(true);
    setPick({ ...pick, name, img });
    const house = await launchHousePick();

    const results = playWithIA(name, house.name);

    setTimeout(() => {
      setResults(results);

      if (results === "win") {
        setScore(score + 1);
      }
    }, 500);
  };

  const playWithIA = (pick, housePick) => {
    if (housePick === pick) {
      return "draw";
    }
    if (pick === "paper") {
      if (housePick === "scissors") {
        return "lose";
      }
      if (housePick === "rock") {
        return "win";
      }
    } else if (pick === "scissors") {
      if (housePick === "paper") {
        return "win";
      }
      if (housePick === "rock") {
        return "lose";
      }
    } else if (pick === "rock") {
      if (housePick === "paper") {
        return "lose";
      }
      if (housePick === "scissors") {
        return "win";
      }
    }
  };

  const handlePlayAgainClick = () => {
    setPlaying(false);
    setResults("");
  };

  return (
    <TableStyled playing={playing} results={results}>
      {!playing ? (
        <>
          <Token name="paper" img={PaperImg} onClick={onClick} />
          <Token name="scissors" img={ScissorsImg} onClick={onClick} />
          <Token name="rock" img={RockImg} onClick={onClick} />
        </>
      ) : (
        <>
          <div className="in-game">
            <Token
              name={pick.name}
              img={pick.img}
              isShadowAnimated={results === "win" ? true : false}
              playing={playing}
            />
            <p>You Picked</p>
          </div>
          <div className="in-game">
            <Token
              name={housePick.name}
              img={housePick.img}
              isShadowAnimated={results === "lose" ? true : false}
              playing={playing}
            />
            <p>The house picked</p>
          </div>
          <div className="results">
            {results ? (
              <>
                <h2>YOU {results}</h2>
                <WhiteButton onClick={handlePlayAgainClick}>
                  Play again
                </WhiteButton>
              </>
            ) : null}
          </div>
        </>
      )}
    </TableStyled>
  );
}

export default Table;
