import ActionTypes from "../actions/ActionsTypes";

const INITIAL_STATE = {
  year: "XI",
  tableYear: "XI",
};

const YearReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SETYEAR: {
      return {
        ...state,
        year: action.payload,
      };
    }
    case ActionTypes.SETTABLEYEAR: {
      return {
        ...state,
        tableYear: action.payload,
      };
    }
    default:
      return state;
  }
};
export { YearReducer };
