import { combineReducers } from "redux";
import reducer from "./reducer";
import brandReducer from "./brandReducer";

import loginReducer from "./loginReducer";
import onBoardQueryReducer from "./onboardQueryReducer";


const rootReducer = combineReducers({
  reducer,
  brandReducer,
  loginReducer,
  onBoardQueryReducer
});

export default rootReducer;
