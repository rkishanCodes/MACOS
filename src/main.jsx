import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BootScreen from "./components/BootScreen/BootScreen.jsx";
import Hello from "./components/BootScreen/Hello.jsx";
import LockScreen from "./LockScreen.jsx";
import "./fonts.css";

import store from "./redux/store.js";
import { Provider } from "react-redux";
import Desktop from "./components/BootScreen/Desktop/Desktop.jsx";
import DockApp from "./components/Dock/DockApp.jsx";
import TestGesture from "./components/Dock/TestGesture.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/boot",
    element: <BootScreen />,
  },
  {
    path: "/hello",
    element: <Hello />,
  },
  {
    path: "/lock",
    element: <LockScreen />,
  },
  {
    path: "/desktop",
    element: <Desktop />,
  },
  {
    path: "/dock",
    element: <DockApp />,
  },
  {
    path: "/test",
    element: <TestGesture />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
