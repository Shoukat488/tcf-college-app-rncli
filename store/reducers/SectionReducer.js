import ActionTypes from "../actions/ActionsTypes";

const INITIAL_STATE = {
  sectionsXI: [],
  sectionsXII: [],
};

const SectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SETSECTIONSXI: {
      console.log('reducer XI data: ',action.payload)
      return {
        ...state,
        sectionsXI: action.payload,
      };
    }
    case ActionTypes.SETSECTIONSXII: {
      return {
        ...state,
        sectionsXII: action.payload,
      };
    }
    default:
      return state;
  }
};

export { SectionReducer };
