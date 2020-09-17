import ActionTypes from "../actions/ActionsTypes";

const INITIAL_STATE = {
    tableXI: {},
    tableXII: {},
};

function TableReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.SETCURRENTTABLEXI: {
            return {
                ...state,
                tableXI: action.payload,
            };
        }
        case ActionTypes.SETCURRENTTABLEXII: {
            return {
                ...state,
                tableXII: action.payload
            }
        }
        default:
            return state;
    }
}

export { TableReducer };
