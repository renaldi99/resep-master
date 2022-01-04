import { combineReducers } from "redux";
import AuthReducer from "./auth";

const rootReducer = combineReducers({
  AuthReducer,
});

export default rootReducer;
