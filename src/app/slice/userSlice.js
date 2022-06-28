// Libraries
import { createSlice } from "@reduxjs/toolkit";

// ENV
import { BACKGROUND_IMG, PROFILE_IMG } from "../../env";

function getToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return {
      info: {
        uname: "Loading...",
        headline: "Loading...",
        profle: PROFILE_IMG,
        bg: BACKGROUND_IMG,
      },
    };
  }

  return {
    info: {
      uname: "Loading...",
      headline: "Loading...",
      profle: PROFILE_IMG,
      bg: BACKGROUND_IMG,
    },
    token,
  };
}

const userSlice = createSlice({
  name: "user",
  initialState: getToken(),
  reducers: {
    update: (state, action) => {
      const options = Object.keys(action.payload);
      for (let i of options) {
        state[i] = action.payload[i];
      }
      return state;
    },
    fetchToken: (state, action) => {
      if (state["info"] === undefined) {
        state = getToken();
        return state;
      }

      state["token"] = localStorage.getItem("token");
      return state;
    },
  },
});

export const { update, fetchToken } = userSlice.actions;
export default userSlice.reducer;
