import { combineReducers } from "redux";
import latlngReducer from "./latlngReducer";
import nearByReducer from "./nearByReducer";

const rootReducer = combineReducers({
  latlngReducer,
  nearByReducer,
});
export default rootReducer;
