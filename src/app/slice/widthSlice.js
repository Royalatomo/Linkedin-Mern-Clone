// Libraries
import { createSlice } from "@reduxjs/toolkit";

// Current Window-Width Slice
const widthSlice = createSlice({
  name: "width",
  initialState: window.innerWidth,
  reducers: {
    updateWidth: (state, action) => {
      state = window.innerWidth;
      return state;
    },
  },
});

export const { updateWidth } = widthSlice.actions;
export default widthSlice.reducer;
