import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeApp: "finder",
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
    scale: 1,
    prevX: null,
    prevY: null,
  },
  safari: {
    minimize: false,
    fullScreen: false,
    active: false,
    width: 500,
    height: 400,
    x: 400,
    y: 100,
    maxWidth: 800,
    maxHeight: 600,
    originalWidth: 500,
    originalHeight: 500,
    scale: 1,
    prevX: null,
    prevY: null,
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
    scale: 1,
    prevX: null,
    prevY: null,
  },
  calculator: {
    minimize: false,
    fullScreen: false,
    active: false,
    width: 800,
    height: 600,
    x: 400,
    y: 50,
    maxWidth: 800,
    maxHeight: 601,
    originalWidth: 231,
    originalHeight: 361,
    scale: 1,
    prevX: null,
    prevY: null,
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
    scale: 1,
    prevX: null,
    prevY: null,
  },
  about: {
    minimize: false,
    fullScreen: false,
    active: false,
    width: 500,
    height: 500,
    x: 400,
    y: 100,
    maxWidth: 1000,
    maxHeight: 600,
    originalWidth: 500,
    originalHeight: 500,
    scale: 1,
    prevX: null,
    prevY: null,
  },
  gemini: {
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
    scale: 1,
    prevX: null,
    prevY: null,
  },
  appIcons: [
    { src: "finderIcon", appName: "finder" },
    { src: "safariIcon", appName: "safari" },
    { src: "aboutIcon", appName: "about" },
    { src: "terminalIcon", appName: "terminal" },
    { src: "calculatorIcon", appName: "calculator" },
    { src: "geminiIcon", appName: "gemini" },
    null,
    { src: "trashEmptyIcon", appName: "bin" },
  ],
  isMobile: false,
};

const appSlice = createSlice({
  name: "apps",
  initialState,

  reducers: {
    SetActiveApp: (state, action) => {
      const { appName } = action.payload;
      state.activeApp = appName;
    },

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
      state[app].prevX = state[app].x;
      state[app].prevY = state[app].y;

      const newIcon = {
        divSrc: `${app}Minimize`,
        divName: app,
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

      const appIconIndex = state.appIcons.findIndex(
        (icon) => icon?.divName === app
      );
      if (appIconIndex !== -1) {
        state.appIcons.splice(appIconIndex, 1);
      }
    },
    setDeviceType: (state, action) => {
      state.isMobile = action.payload.isMobile;
    },

    minimizeAllOtherAppsOnMobile: (state, action) => {
      if (!state.isMobile) return; 

      const { clickedApp } = action.payload;
      Object.keys(state).forEach((app) => {
        if (
          typeof state[app] === "object" &&
          app !== clickedApp &&
          app !== "appIcons"
        ) {
          if (!state[app].minimize) {
            state[app].minimize = true;
            state[app].prevX = state[app].x;
            state[app].prevY = state[app].y;
          }
        }
      });

      if (state[clickedApp].minimize) {
        state[clickedApp].minimize = false;
        state[clickedApp].active = true;
      }

      state.activeApp = clickedApp;
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
  SetActiveApp,
  setDeviceType,
  minimizeAllOtherAppsOnMobile,
} = appSlice.actions;

export const selectApps = (state) => state.apps;

export default appSlice.reducer;


