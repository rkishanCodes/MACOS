import React, { useState } from "react";


const NormalCalculator = React.memo(() => {

  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumberClick = (number) => {
    if (display === "0" || shouldResetDisplay) {
      setDisplay(number.toString());
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperationClick = (op) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
    } else if (operation) {
      const result = performCalculation();
      setPreviousValue(result);
      setDisplay(result.toString());
    }
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const handleEqualClick = () => {
    if (previousValue !== null && operation) {
      const result = performCalculation();
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const performCalculation = () => {
    const current = parseFloat(display);
    switch (operation) {
      case "+":
        return previousValue + current;
      case "-":
        return previousValue - current;
      case "×":
        return previousValue * current;
      case "÷":
        return previousValue / current;
      default:
        return current;
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
  };

  const handlePercentage = () => {
    setDisplay((parseFloat(display) / 100).toString());
  };

  const handleToggleSign = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const Button = ({ children, onClick, className, type }) => (
    <button
      onClick={onClick}
      className={`text-[1.25rem] font-[200] cursor-default ${
        type
          ? "focus:outline-2 active:bg-black/30"
          : "focus:outline-none active:bg-white/50"
      } ${className}`}
    >
      {children}
    </button>
  );

  return (
    
      <div className="w-full h-full  rounded-[10px]   text-white overflow-hidden ">
        <div className=" h-20 flex items-end justify-end  pr-3">
          <div className="text-white text-[2.5rem] font-[normal] truncate ">
            {display}
          </div>
        </div>
        {/* <div className="grid grid-cols-4 gap-x-[1px] gap-y-[1px] grid-rows-[48px_48px_48px_48px_48px] "> */}
        <div className="grid grid-cols-4 gap-x-[1px] gap-y-[1px] auto-rows-fr h-[calc(100%-7rem)] ">
          <Button onClick={handleClear} className="bg-white/10">
            {previousValue === null ? "AC" : "C"}
          </Button>
          <Button onClick={handleToggleSign} className="bg-white/10">
            +/-
          </Button>
          <Button onClick={handlePercentage} className="bg-white/10 ">
            %
          </Button>
          <Button
            onClick={() => handleOperationClick("÷")}
            className="bg-orange-400"
            type="orange"
          >
            ÷
          </Button>
          <Button onClick={() => handleNumberClick(7)} className="bg-white/35 ">
            7
          </Button>
          <Button onClick={() => handleNumberClick(8)} className="bg-white/35 ">
            8
          </Button>
          <Button onClick={() => handleNumberClick(9)} className="bg-white/35 ">
            9
          </Button>
          <Button
            onClick={() => handleOperationClick("×")}
            className="bg-orange-400 "
            type="orange"
          >
            ×
          </Button>
          <Button onClick={() => handleNumberClick(4)} className="bg-white/35 ">
            4
          </Button>
          <Button onClick={() => handleNumberClick(5)} className="bg-white/35 ">
            5
          </Button>
          <Button onClick={() => handleNumberClick(6)} className="bg-white/35 ">
            6
          </Button>
          <Button
            onClick={() => handleOperationClick("-")}
            className="bg-orange-400 "
            type="orange"
          >
            -
          </Button>
          <Button onClick={() => handleNumberClick(1)} className="bg-white/35 ">
            1
          </Button>
          <Button onClick={() => handleNumberClick(2)} className="bg-white/35 ">
            2
          </Button>
          <Button onClick={() => handleNumberClick(3)} className="bg-white/35 ">
            3
          </Button>
          <Button
            onClick={() => handleOperationClick("+")}
            className="bg-orange-400 "
            type="orange"
          >
            +
          </Button>
          <Button
            onClick={() => handleNumberClick(0)}
            className="bg-white/35  col-span-2"
          >
            0
          </Button>
          <Button
            onClick={() => handleNumberClick(".")}
            className="bg-white/35 "
          >
            .
          </Button>
          <Button
            onClick={handleEqualClick}
            className="bg-orange-400 "
            type="orange"
          >
            =
          </Button>
        </div>
      </div>
  );
});

export default NormalCalculator;
