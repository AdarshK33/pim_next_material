import { combineReducers } from "redux";
import reducer from "./reducer";
import brandReducer from "./brandReducer";

import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  reducer,
  brandReducer,
  loginReducer
});

export default rootReducer;
