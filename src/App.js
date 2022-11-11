import { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import styled from "styled-components";
import Wrapper from "./Wrapper";
import Table from "./components/Table";
import Rules from "./components/Rules";

const AppStyled = styled.main`
  background-image: radial-gradient(circle at top, #1f3757 0%, #131537 100%);
  color: #fff;
  font-family: "Barlow Semi Condensed", sans-serif;

  .app-content {
    padding: 2em;
    box-sizing: border-box;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const ScoreContext = createContext(0);

function App() {
  const [score, setScore] = useState(0);

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      <AppStyled>
        <Wrapper>
          <div className="app-content">
            <Header />
            <Table />
            <Rules />
          </div>
        </Wrapper>
      </AppStyled>
    </ScoreContext.Provider>
  );
}

export default App;
