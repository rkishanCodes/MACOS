import { createSlice } from "@reduxjs/toolkit";
import finderIcon from "../../assets/Apps/finder.svg";
import safariIcon from "../../assets/Apps/safari.svg";
import terminalIcon from "../../assets/Apps/terminal.svg";
import calculatorIcon from "../../assets/Apps/calculator.svg";
import trashEmptyIcon from "../../assets/Apps/Trash Empty.svg";

const initialState = {
  finder: {
    minimize: false,
    fullScreen: false,
    active: true,
    width: 500,
    height: 400,
    x: 400,
    y: 100,
    maxWidth: 1200,
    maxHeight: 600,
    originalWidth: 500,
    originalHeight: 400,
    prevx: null,
    prevy: null,
    scale: 1,
  },
  safari: {
    minimize: false,
    fullScreen: false,
    active: false,
    width: 233,
    height: 321,
    x: 400,
    y: 100,
    maxWidth: 800,
    maxHeight: 600,
    originalWidth: 500,
    originalHeight: 500,
  },
  terminal: {
    minimize: false,
    fullScreen: false,
    active: false,
    width: 500,
    height: 500,
    x: 400,
    y: 100,
    maxWidth: 800,
    maxHeight: 600,
    originalWidth: 500,
    originalHeight: 500,
  },
  calculator: {
    minimize: false,
    fullScreen: false,
    active: false,
    width: 233,
    height: 321,
    x: 400,
    y: 100,
    maxWidth: 233,
    maxHeight: 321,
    originalWidth: 233,
    originalHeight: 321,
    prevx: null,
    prevy: null,
    scale: 1,
  },
  bin: {
    minimize: false,
    fullScreen: false,
    active: false,
    width: 500,
    height: 500,
    x: 400,
    y: 100,
    maxWidth: 800,
    maxHeight: 600,
    originalWidth: 500,
    originalHeight: 500,
  },
  // Add appIcons dynamically
  appIcons: [
    { src: finderIcon, appName: "finder" },
    { src: safariIcon, appName: "safari" },
    { src: terminalIcon, appName: "terminal" },
    { src: calculatorIcon, appName: "calculator" },
    null,
    { src: trashEmptyIcon, appName: "bin" },
  ],
};

const appSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    toggleAppState: (state, action) => {
      const { app, field } = action.payload;
      state[app][field] = !state[app][field];
    },
    updateAppState: (state, action) => {
      const { app, field, value } = action.payload;
      state[app][field] = value;
    },
    updatePosition: (state, action) => {
      const { app, x, y } = action.payload;
      state[app].x = x;
      state[app].y = y;
    },
    updateSize: (state, action) => {
      const { app, width, height } = action.payload;
      state[app].width = Math.min(width, state[app].maxWidth);
      state[app].height = Math.min(height, state[app].maxHeight);
    },
    updateMaxSize: (state, action) => {
      const { app } = action.payload;
      if (
        state[app].width === state[app].maxWidth &&
        state[app].height === state[app].maxHeight
      ) {
        state[app].width = state[app].originalWidth;
        state[app].height = state[app].originalHeight;
        state[app].x = 400;
        state[app].y = 100;
      } else {
        state[app].width = state[app].maxWidth;
        state[app].height = state[app].maxHeight;
        state[app].x = 0;
        state[app].y = 0;
      }
    },

    minimizeApp: (state, action) => {
      const { app } = action.payload;
      state[app].minimize = true;
      state[app].scale = 0.165; // Scale for the dock
      state[app].prevX = state[app].x;
      state[app].prevY = state[app].y;
      state[app].x = null; // Will be set by Dock
      state[app].y = null; // Will be set by Dock

      // Add to appIcons before 'bin'
      const newIcon = {
        divContent: app,
        appName: app,
      };

      const binIndex = state.appIcons.findIndex(
        (icon) => icon?.appName === "bin"
      );

      if (binIndex !== -1) {
        state.appIcons.splice(binIndex, 0, newIcon);
      } else {
        state.appIcons.push(newIcon);
      }
    },

    restoreApp: (state, action) => {
      const { app } = action.payload;
      state[app].minimize = false;
      state[app].active = true;
      state[app].scale = 1;
      state[app].x = state[app].prevX;
      state[app].y = state[app].prevY;
    },
    updateMinimizedPosition: (state, action) => {
      const { app, x, y } = action.payload;
      state[app].x = x;
      state[app].y = y;
    },
  },
});

export const {
  toggleAppState,
  updateAppState,
  updatePosition,
  updateSize,
  updateMaxSize,
  minimizeApp,
  restoreApp,
  updateMinimizedPosition,
} = appSlice.actions;

export const selectApps = (state) => state.apps;

export default appSlice.reducer;
