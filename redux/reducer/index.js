import { combineReducers } from "redux";
import reducer from "./reducer";
import brandReducer from "./brandReducer";
import channelReducer from "./channelReducer"

import loginReducer from "./loginReducer";
import onBoardQueryReducer from "./onboardQueryReducer";
import app from "./appReducer"

const rootReducer = combineReducers({
  app,
  reducer,
  brandReducer,
  loginReducer,
  onBoardQueryReducer,
  channelReducer
});

export default rootReducer;
