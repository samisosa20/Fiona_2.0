import { combineReducers } from "redux";
import login_reducer from "./loginReducer";

const rootReducers = combineReducers({
  login_reducer,
});

export default rootReducers;
