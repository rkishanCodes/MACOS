import { configureStore } from "@reduxjs/toolkit";
import bootReducer from "./slices/bootSlice";
import appReducer from "./slices/appSlice";
import finderReducer from "./slices/finderSlice";


const store = configureStore({
  reducer: {
    boot: bootReducer,
    apps: appReducer,
    finder: finderReducer,
  },
});

export default store;
