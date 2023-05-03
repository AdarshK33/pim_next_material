import { combineReducers } from "redux";
// import reducer from "./reducer";
// import brandReducer from "./brandReducer";
// import channelReducer from "./channelReducer"

import loginReducer from "./loginReducer";
// import onBoardQueryReducer from "./onboardQueryReducer";
// // import app from "./appReducer"
// import catalogQueryReducer from "./catalogQueryReducer"
// import catalogReducer from "./catalogReducer";
// import bulkReducer from "./bulkReducer";
// import syncCommandReducer from "./syncCommandReducer";

// import syncQueryReducer from "./syncQueryReducer"
import catalogServiceNewReducer from "./catalogServiceNew";

const rootReducer = combineReducers({
  // app,
  //   reducer,
  // brandReducer,
  loginReducer,
  //   onBoardQueryReducer,
  //   channelReducer,
  //   catalogQueryReducer,
  //   catalogReducer,
  //   bulkReducer,
  //   syncCommandReducer,
  //   syncQueryReducer,
  catalogServiceNewReducer,
});

export default rootReducer;
