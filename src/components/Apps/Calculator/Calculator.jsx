import React from "react";
import ResizableWindow from "..//ResizableWindow";

const Calculator = React.memo(() => {
  return <ResizableWindow appName="calculator">Calculator</ResizableWindow>;
});

export default Calculator;
