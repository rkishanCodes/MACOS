import { configureStore } from "@reduxjs/toolkit";
import bootReducer from "./slices/bootSlice";
import appReducer from "./slices/appSlice";

const store = configureStore({
  reducer: {
    boot: bootReducer,
    apps: appReducer,
  },
});

export default store;
