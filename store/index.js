import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { TableReducer } from "./reducers/tableRedcuer";
import { YearReducer } from "./reducers/yearReducer";
import { SectionReducer } from "./reducers/SectionReducer";
import { RouteReducer } from "./reducers/routeReducer";
import TableAction from "./actions/TableAction";
import YearAction from "./actions/YearAction";
import { NotificationReducer } from "./reducers/NotificationReducer";
import NotificationAction from "./actions/NotificationAction";
const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers({
  TableReducer,
  YearReducer,
  SectionReducer,
  RouteReducer,
  NotificationReducer,
});
let store = createStore(rootReducer, middleware);
store.dispatch(TableAction.setCurrentTableXI());
store.dispatch(TableAction.setCurrentTableXII());
store.dispatch(YearAction.setYear())
store.dispatch(NotificationAction.setNotification())
export default store;
