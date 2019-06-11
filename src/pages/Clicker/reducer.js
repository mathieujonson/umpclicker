export const clickerReducer = (state, action) => {
  switch (action.type) {
    case "ADD_STRIKES":
      return { ...state, strikes: state.strikes === 3 ? 0 : state.strikes + 1 };
    case "MINUS_STRIKES":
      return { ...state, strikes: state.strikes === 0 ? 3 : state.strikes - 1 };
    case "ADD_BALLS":
      return { ...state, balls: state.balls === 4 ? 0 : state.balls + 1 };
    case "MINUS_BALLS":
      return { ...state, balls: state.balls === 0 ? 4 : state.balls - 1 };
    case "ADD_OUTS":
      return { ...state, outs: state.outs === 3 ? 0 : state.outs + 1 };
    case "MINUS_OUTS":
      return { ...state, outs: state.outs === 0 ? 3 : state.outs - 1 };
    case "ADD_HOME":
      return { ...state, home: state.home + 1 };
    case "MINUS_HOME":
      return { ...state, home: state.home === 0 ? 0 : state.home - 1 };
    case "ADD_AWAY":
      return { ...state, away: state.away + 1 };
    case "MINUS_AWAY":
      return { ...state, away: state.away === 0 ? 0 : state.away - 1 };
    case "ADD_INNING":
      return { ...state, inning: state.inning + 1 };
    case "MINUS_INNING":
      return { ...state, inning: state.inning === 1 ? 1 : state.inning - 1 };
    case "CLEAR_COUNT":
      return { ...state, strikes: 0, balls: 0 };
    case "CLEAR_INNING":
      return { ...state, strikes: 0, balls: 0, outs: 0 };
    default:
      return state;
  }
};
