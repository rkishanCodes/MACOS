import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BootScreen from "./components/BootScreen/BootScreen.jsx";
import Hello from "./components/BootScreen/Hello.jsx";
import "./fonts.css";

import store from "./redux/store.js";
import { Provider } from "react-redux";
import Desktop from "./components/BootScreen/Desktop/Desktop.jsx";
import { Achievements } from "./components/Apps/About/Achievements.jsx";
import { Experience } from "./components/Apps/About/Experience.jsx";
import LockScreen from "./components/BootScreen/LockScreen.jsx";
import AICalculator from "./components/Apps/Calculator/AICalculator.jsx";
import { MantineProvider } from "@mantine/core";


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
    path: "/lock",
    element: <LockScreen  />,
  },
  {
    path: "/hello",
    element: <Hello />,
  },

  {
    path: "/desktop",
    element: <Desktop />,
  },
  {
    path: "/experience",
    element: <Experience />,
  },
  {
    path: "/AIcal",
    element: <AICalculator />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
