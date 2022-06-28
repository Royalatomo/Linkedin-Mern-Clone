// Libraries
import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: "suggestions",
    
    reducers:{
        change: (state, action) => {
            state = action.payload.value;
            return state;
        }
    }
})

export const {change} = dashboardSlice.actions;
export default dashboardSlice.reducer;