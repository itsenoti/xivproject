import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Header from "./Header";
import Navigation from "./Navigation/Navigation";

function Pvp({ theme, setTheme }) {
  const [currentPlayerExp, setExp] = useState(0);
  const [currentPlayerLvl, setLvl] = useState(1);
  const [isValid, setIsValid] = useState(true);

  function expChangedHandler(data) {
    if (data.length === 0) setExp(0);
    else if (data > 0) setExp(data);
  }

  function lvlChangedHandler(data) {
    if (data.length === 0) setLvl(1);
    else if (data > 0 && data < 25) {
      setLvl(data);
      setIsValid(true);
    } else setIsValid(false);
  }

  function computeMatchCount() {
    const MAX_EXP = 108000;
    const DAILY_ROULETTE_EXP = 1500; // Fixed bonus
    const FRONTLINES_MATCH_ALL_WIN_EXP = 1500;
    const FRONTLINES_MATCH_ALL_LOS_EXP = 1000;
    const CC_MATCH_ALL_WIN_EXP = 900;
    const CC_MATCH_ALL_LOS_EXP = 700;

    var tempExp = 0;

    if (currentPlayerLvl >= 1 && currentPlayerLvl <= 4) {
      tempExp = (currentPlayerLvl - 1) * 2000 + parseInt(currentPlayerExp);
    } else if (currentPlayerLvl >= 5 && currentPlayerLvl <= 9) {
      tempExp = (currentPlayerLvl - 4 - 1) * 3000 + 8000 + parseInt(currentPlayerExp);
    } else if (currentPlayerLvl >= 10 && currentPlayerLvl <= 14) {
      tempExp = (currentPlayerLvl - 9 - 1) * 4000 + 23000 + parseInt(currentPlayerExp);
    } else if (currentPlayerLvl >= 15 && currentPlayerLvl <= 19) {
      tempExp = (currentPlayerLvl - 14 - 1) * 43000 + parseInt(currentPlayerExp);
    } else if (currentPlayerLvl >= 20 && currentPlayerLvl <= 24) {
      tempExp = (currentPlayerLvl - 19 - 1) * 7500 + 70500;
      parseInt(currentPlayerExp);
    }

    if (isValid) {
      const m_remainingExpMax_Fl = Math.round((MAX_EXP - tempExp) / FRONTLINES_MATCH_ALL_WIN_EXP);
      const m_remainingExpMin_Fl = Math.round((MAX_EXP - tempExp) / FRONTLINES_MATCH_ALL_LOS_EXP);
      const m_remainingExpMin_Fl_Bonus = Math.round(
        (MAX_EXP - tempExp) / (FRONTLINES_MATCH_ALL_WIN_EXP + DAILY_ROULETTE_EXP)
      );
      const m_remainingExpMax_Fl_Bonus = Math.round(
        (MAX_EXP - tempExp) / (FRONTLINES_MATCH_ALL_LOS_EXP + DAILY_ROULETTE_EXP)
      );
      const m_remainingExpMax_Cc = Math.round((MAX_EXP - tempExp) / CC_MATCH_ALL_WIN_EXP);
      const m_remainingExpMin_Cc = Math.round((MAX_EXP - tempExp) / CC_MATCH_ALL_LOS_EXP);

      return (
        <>
          <h2 className="">Frontlines (20 minutes per match)</h2>
          {/* 
          <div>
            - Always WINS (Min): <b>{m_remainingExpMax_Fl}</b> matches (Daily bonus not included)
          </div>
          <div>
            - Always LOSE (Max): <b>{m_remainingExpMin_Fl}</b> matches (Daily bonus not included)
          </div> */}
          <div>
            - Always WINS 1 match daily (+Daily Bonus): <b>{m_remainingExpMin_Fl_Bonus}</b> matches
          </div>
          <div>
            - Always LOSES 1 match daily (+Daily Bonus): <b>{m_remainingExpMax_Fl_Bonus}</b> matches
          </div>

          <h2 className="">Crystalline Conflict (5 minutes per match)</h2>
          <div>
            - Always WINS: <b>{m_remainingExpMax_Cc}</b> matches
          </div>
          <div>
            - Always LOSES: <b>{m_remainingExpMin_Cc}</b> matches
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Header />
      <Navigation />
      <Container className="containerBody">
        <h2 className="">PVP Series Malmstones EXP Calculator</h2>
        <div>
          Input current Level and EXP to check how many Frontlines or Crystalline Conflict matches
          are still needed to get the Level 25 reward.
        </div>
        <TextField
          id="outlined-number"
          label="Current Series Level"
          placeholder="1"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => lvlChangedHandler(e.target.value)}
        />
        <TextField
          id="outlined-number"
          label="Current EXP"
          placeholder="0"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => expChangedHandler(e.target.value)}
        />
        {/* {currentPlayerLvl}/{currentPlayerExp} */}
        <div>{computeMatchCount()}</div>
      </Container>
    </>
  );
}

export default Pvp;
