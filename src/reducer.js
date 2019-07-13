export const globalReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_HOME":
      return { ...state, home: action.payload };
    case "UPDATE_AWAY":
      return { ...state, away: action.payload };
    case "CLEAR_GAME":
      return { ...state, home: "", away: "" };
    default:
      return state;
  }
};
