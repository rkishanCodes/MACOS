import { configureStore } from "@reduxjs/toolkit";
import bootReducer from "./slices/bootSlice";
import appReducer from "./slices/appSlice";
import finderReducer from "./slices/finderSlice";
import binReducer from "./slices/binSlice";

const store = configureStore({
  reducer: {
    boot: bootReducer,
    apps: appReducer,
    finder: finderReducer,
    bin: binReducer,
  },
});

export default store;
