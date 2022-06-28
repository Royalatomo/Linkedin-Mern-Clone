// Libraries
import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: { PostId: "", reply: { name: "" } },

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

export const { update } = commentSlice.actions;
export default commentSlice.reducer;
