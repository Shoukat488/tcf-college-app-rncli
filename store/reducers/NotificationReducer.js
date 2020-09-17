import ActionTypes from "../actions/ActionsTypes";

const INITIAL_STATE = {
  // time to send notification before the specified value
  notificationTime: 5,
  token: "",
};

const NotificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SETNOTIFICATION: {
      return {
        ...state,
        notificationTime: action.payload,
      };
    }
    case ActionTypes.SETEXPOPUSHTOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    default:
      return state;
  }
};
export { NotificationReducer };
