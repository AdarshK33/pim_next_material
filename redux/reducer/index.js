import { combineReducers } from "redux";
import reducer from "./reducer";
import brandReducer from "./brandReducer";
import channelReducer from "./channelReducer"

import loginReducer from "./loginReducer";
import onBoardQueryReducer from "./onboardQueryReducer";
// import app from "./appReducer"
import catalogQueryReducer from "./catalogQueryReducer"
import catalogReducer from "./catalogReducer";
import bulkReducer from "./bulkReducer";

const rootReducer = combineReducers({
  // app,
  reducer,
  brandReducer,
  loginReducer,
  onBoardQueryReducer,
  channelReducer,
  catalogQueryReducer,
  catalogReducer,
  bulkReducer
});

export default rootReducer;
