// Libraries
import { createSlice } from "@reduxjs/toolkit";

// Current Window-Width Slice
const feedSlice = createSlice({
  name: "feed",
  initialState: { show: "home" },
  reducers: {
    changeView: (state, action) => {
      state.show = action.payload.show;
      return state;
    },
  },
});

export const { changeView } = feedSlice.actions;
export default feedSlice.reducer;
