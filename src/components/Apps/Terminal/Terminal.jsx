import React from "react";
import ResizableWindow from "../ResizableWindow";

const Terminal = React.memo(() => {
  return <ResizableWindow appName="terminal">Terminal</ResizableWindow>;
});

export default Terminal;
