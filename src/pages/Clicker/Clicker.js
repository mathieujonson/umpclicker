import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from "react";
import "./clicker.scss";
import { clickerReducer } from "./reducer";

const initialState = {
  balls: 0,
  strikes: 0,
  outs: 0,
  inning: 1,
  halfInning: "top",
  home: 0,
  away: 0
};

const ClickerContext = createContext();

export const Clicker = () => {
  const [state, dispatch] = useReducer(clickerReducer, initialState);
  return (
    <ClickerContext.Provider value={{ state, dispatch }}>
      <div className="clicker">
        <h2>Current Inning</h2>
        <div className="inning">
          <Counter label="Balls" />
          <Counter label="Strikes" />
          <Counter label="Outs" />
          <button
            className="clear-button"
            onClick={() => dispatch({ type: "CLEAR_INNING" })}
          >
            Clear Inning
          </button>
          <button
            className="clear-button"
            onClick={() => dispatch({ type: "CLEAR_COUNT" })}
          >
            Clear Count
          </button>
        </div>

        <h2>Game</h2>
        <div className="game">
          <Counter label="Home" />
          <Counter label="Away" />
          <Counter label="Inning" />
        </div>
      </div>
    </ClickerContext.Provider>
  );
};

const Counter = ({ label }) => {
  const { state, dispatch } = useContext(ClickerContext);
  const stateKey = label.toLowerCase();
  const minusClickHandler = useCallback(
    () => dispatch({ type: `MINUS_${stateKey.toUpperCase()}` }),
    [dispatch, stateKey]
  );
  const addClickHandler = useCallback(
    () => dispatch({ type: `ADD_${stateKey.toUpperCase()}` }),
    [dispatch, stateKey]
  );
  return (
    <div className="counter">
      <h4>{label}</h4>
      <div className="count-container">
        <button className="minus-button" onClick={minusClickHandler}>
          -
        </button>
        <div className="count-number">{state[stateKey]}</div>
        <button className="plus-button" onClick={addClickHandler}>
          +
        </button>
      </div>
    </div>
  );
};
