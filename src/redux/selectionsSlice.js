import { createSlice } from "@reduxjs/toolkit";

const selectionsSlice = createSlice({
  name: "selections",
  initialState: {},
  reducers: {
    update: (state, action) => {
      Object.assign(state, action.payload);
    },
  }
});

export const { update } = selectionsSlice.actions;
export default selectionsSlice.reducer;