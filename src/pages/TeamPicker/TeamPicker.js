import React, { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import { TeamDropDown } from "./TeamDropDown";
import "./teamPicker.scss";

export const TeamPicker = props => {
  const [teamNames, setTeamNames] = useState([]);
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    setTeamNames([
      "Us",
      "Them",
      "Angels",
      "Braves",
      "Cardinals",
      "Cubs",
      "Cubs",
      "Giants",
      "Indians",
      "Mets",
      "Pirates",
      "Red Sox",
      "Royals",
      "Twins",
      "Yankees"
    ]);
    // fetch("https://umpclicker.com/api/teams").then(response => {
    //   response.json().then(data => {
    //     setTeamNames(data);
    //     console.log("data", data);
    //   });
    // });
  }, []);

  const onClickHandler = useCallback(() => {
    props.history.push("/clicker");
  }, [props.history]);

  return (
    <div className="team-picker">
      <h1>Who's playing today?</h1>
      <h2>Home</h2>
      <TeamDropDown teamNames={teamNames} team="home" />
      <h2>Away</h2>
      <TeamDropDown teamNames={teamNames} team="away" />
      <button
        className="primary-button"
        onClick={onClickHandler}
        disabled={!(state.home && state.away && state.home !== state.away)}
      >
        Play Ball!
      </button>
    </div>
  );
};
