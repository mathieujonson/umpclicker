import React, { useState } from "react";
import "./clicker.scss";

export const Clicker = () => {
  const [inningDescription, setInningDescription] = useState("top");

  return (
    <div className="clicker">
      <h2>Current Inning</h2>
      <div className="inning">
        <Counter label="Balls" count={2} />
        <Counter label="Strikes" count={1} />
        <Counter label="Outs" count={2} />
        <button className="end-inning">End Inning</button>
      </div>

      <h2>Game</h2>
      <div className="game">
        <Counter label="Home" count={2} />
        <Counter label="Away" count={2} />
        <Counter label="Inning" count={4} />
      </div>
    </div>
  );
};

const Counter = ({ label, count }) => (
  <div className="counter">
    <h4>{label}</h4>
    <div className="count-container">
      <button className="minus-button">-</button>
      <div className="count-number">{count}</div>
      <button className="plus-button">+</button>
    </div>
  </div>
);
