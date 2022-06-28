// Libraries
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import widthReducer from "./slice/widthSlice";
import viewerReducer from "./slice/viewerSlice";
import commentReducer from "./slice/commentSlice";
import feedReducer from "./slice/feedSlice";
import userReducer from "./slice/userSlice";
import dashbaordReducer from "./slice/dashboardSlice";
import postingReducer from "./slice/postingSlice";

const store = configureStore({
  reducer: {
    width: widthReducer,
    viewer: viewerReducer,
    comment: commentReducer,
    feed: feedReducer,
    dashboard: dashbaordReducer,
    user: userReducer,
    posting: postingReducer
  },
});

export default store;
