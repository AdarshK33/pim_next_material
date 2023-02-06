import { combineReducers } from "redux";
import reducer from "./reducer";
import brandReducer from "./brandReducer";
import channelReducer from "./channelReducer"

import loginReducer from "./loginReducer";
import onBoardQueryReducer from "./onboardQueryReducer";


const rootReducer = combineReducers({
  reducer,
  brandReducer,
  loginReducer,
  onBoardQueryReducer,
  channelReducer
});

export default rootReducer;
