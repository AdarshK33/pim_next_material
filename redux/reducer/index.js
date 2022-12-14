import { combineReducers } from "redux";
import reducer from "./reducer";
import brandReducer from "./brandReducer";


const rootReducer = combineReducers({
  reducer,
  brandReducer,
});

export default rootReducer;
