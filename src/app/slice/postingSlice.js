// Libraries
import { createSlice } from "@reduxjs/toolkit";

const postingSlice = createSlice({
  name: "img-viewer",
  initialState: false,

  reducers: {
    posting: (state, action) => {
      state = action.payload.show;
      return state;
    },
  },
});

export const { posting } = postingSlice.actions;
export default postingSlice.reducer;
