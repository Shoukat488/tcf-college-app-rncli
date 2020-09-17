import ActionTypes from "../actions/ActionsTypes";
const dayNum = new Date().getDay();
const days = ["MON", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
const INITIAL_STATE = {
  route: days[dayNum],
  navigation: null,
};

const RouteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SETROUTE: {
      return {
        ...state,
        route: action.payload,
      };
    }
    case ActionTypes.SETNAV: {
      return {
        ...state,
        navigation: action.payload,
      };
    }
    default:
      return state;
  }
};
export { RouteReducer };
