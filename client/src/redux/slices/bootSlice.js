import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHello: true,
  isBoot: false,
  isLock: false,
  isDesktop: false,
  isAudio: false,
};

const bootSlice = createSlice({
  name: "boot",
  initialState,
  reducers: {
    setHello: (state, action) => {
      state.isHello = action.payload;
    },
    setBoot: (state, action) => {
      state.isBoot = action.payload;
    },
    setLock: (state, action) => {
      state.isLock = action.payload;
    },
    setDesktop: (state, action) => {
      state.isDesktop = action.payload;
    },
    setAudio: (state, action) => {
      state.isAudio = action.payload;
    },
  },
});

export const { setHello, setBoot, setLock, setDesktop, setAudio } =
  bootSlice.actions;

export default bootSlice.reducer;
