import { createSlice } from "@reduxjs/toolkit";

const selectionsSlice = createSlice({
  name: "selections",
  initialState: {},
  reducers: {
    update: (state, action) => {
      state = action.payload;
      return state;
    },
  }
});

export const { update } = selectionsSlice.actions;
export default selectionsSlice.reducer;