import { configureStore } from "@reduxjs/toolkit";
import bootReducer from "./slices/bootSlice";

const store = configureStore({
  reducer: {
    boot: bootReducer,
  },
});

export default store;
