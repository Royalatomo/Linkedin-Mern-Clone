// Libraries
import { createSlice } from "@reduxjs/toolkit";

const viewerSlice = createSlice({
  name: "img-viewer",
  initialState: { show: false },

  reducers: {
    update: (state, action) => {
      const options = Object.keys(action.payload);
      for (let i of options) {
        state[i] = action.payload[i];
      }
      return state;
    },
  },
});

export const { update } = viewerSlice.actions;
export default viewerSlice.reducer;
