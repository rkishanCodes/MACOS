import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  finder: {
    minimize: false,
    fullScreen: false,
    active: true,
    width: 500,
    height: 400,
    x: 400,
    y: 100,
    maxWidth: 1200, // Added maxWidth
    maxHeight: 600, // Added maxHeight
    originalWidth: 500, // Store original dimensions
    originalHeight: 400, // Store original dimensions
  },
  safari: {
    minimize: false,
    fullScreen: false,
    active: false,
    width: 233,
    height: 321,
    x: 400,
    y: 100,
    maxWidth: 800, // Added maxWidth
    maxHeight: 600, // Added maxHeight
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
    maxWidth: 800, // Added maxWidth
    maxHeight: 600, // Added maxHeight
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
    maxWidth: 233, // Added maxWidth
    maxHeight: 321, // Added maxHeight
    originalWidth: 233,
    originalHeight: 321,
  },
  bin: {
    minimize: false,
    fullScreen: false,
    active: false,
    width: 500,
    height: 500,
    x: 400,
    y: 100,
    maxWidth: 800, // Added maxWidth
    maxHeight: 600, // Added maxHeight
    originalWidth: 500,
    originalHeight: 500,
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
      state[app].x = x;
      state[app].y = y;
    },
    updateSize: (state, action) => {
      const { app, width, height } = action.payload;
      state[app].width = Math.min(width, state[app].maxWidth); // Ensure width doesn't exceed maxWidth
      state[app].height = Math.min(height, state[app].maxHeight); // Ensure height doesn't exceed maxHeight
    },
    updateMaxSize: (state, action) => {
      const { app } = action.payload;

      if (
        state[app].width === state[app].maxWidth &&
        state[app].height === state[app].maxHeight
      ) {
        state[app].width = state[app].originalWidth; // Revert to original width
        state[app].height = state[app].originalHeight; // Revert to original height
        state[app].x = 400; // Reset to a specific position if needed
        state[app].y = 100; // Reset to a specific position if needed
      } else {
        // Otherwise, make it fullscreen
        state[app].width = state[app].maxWidth; // Update to maxWidth
        state[app].height = state[app].maxHeight; // Update to maxHeight
        state[app].x = 0; // Fullscreen position
        state[app].y = 0; // Fullscreen position
      }
    },
  },
});

export const {
  toggleAppState,
  updateAppState,
  updatePosition,
  updateSize,
  updateMaxSize,
} = appSlice.actions;

export const selectApps = (state) => state.apps;

export default appSlice.reducer;
