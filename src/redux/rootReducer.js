import { combineReducers } from "@reduxjs/toolkit";
import selectionsReducer from "./selectionsSlice";

const rootReducer = combineReducers({
  selections: selectionsReducer,
});

export default rootReducer;