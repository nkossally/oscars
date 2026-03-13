import { configureStore } from "@reduxjs/toolkit";
import selectionsReducer from "./selectionsSlice";

export const store = configureStore({
  reducer: {
    selections: selectionsReducer,
  }
});