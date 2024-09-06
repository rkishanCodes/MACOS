import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  finder: {
    minimize: false,
    fullScreen: false,
    exit: false,
    active: true,
    width: 500,
    height: 400,
    position: { x: 400, y: 100 },
  },
  safari: {
    minimize: false,
    fullScreen: false,
    exit: false,
    active: false,
    width: 500,
    height: 500,
    position: { x: 400, y: 100 },
  },
  terminal: {
    minimize: false,
    fullScreen: false,
    exit: false,
    active: false,
    width: 500,
    height: 500,
    position: { x: 400, y: 100 },
  },
  calculator: {
    minimize: false,
    fullScreen: false,
    exit: false,
    active: false,
    width: 500,
    height: 500,
    position: { x: 400, y: 100 },
  },
  bin: {
    minimize: false,
    fullScreen: false,
    exit: false,
    active: false,
    width: 500,
    height: 500,
    position: { x: 400, y: 100 },
  },
};

const appSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    toggleAppState: (state, action) => {
      const { app, field } = action.payload;
      state[app][field] = !state[app][field]; // Toggles any boolean field
    },
    updateAppState: (state, action) => {
      const { app, field, value } = action.payload;
      state[app][field] = value; // Dynamically sets a field to a provided value
    },
    updatePosition: (state, action) => {
      const { app, x, y } = action.payload;
      state[app].position = { x, y }; // Update position dynamically
    },
    updateSize: (state, action) => {
      const { app, width, height } = action.payload;
      state[app].width = width;
      state[app].height = height; // Update size dynamically
    },
  },
});

export const { toggleAppState, updateAppState, updatePosition, updateSize } =
  appSlice.actions;

export const selectApps = (state) => state.apps; // Selector to get apps state

export default appSlice.reducer;
