import ActionTypes from "../actions/ActionsTypes";

const INITIAL_STATE = {
    instructors: [],
};

const InstructorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SETINSTRUCTORS: {
            return {
                ...state,
                instructors: action.payload,
            };
        }
        default:
            return state;
    }
}
export { InstructorReducer };
