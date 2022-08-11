import { combineReducers } from "redux";
//LOCAL IMPORTS
import alertReducer from "./NotificationMessages/reducer";

export default combineReducers({
  alertReducer,
});
