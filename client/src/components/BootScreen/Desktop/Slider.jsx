import React, { useMemo } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const SliderDemo = ({ className, value, onChange, icon: Icon, ...props }) => {
  const handleValueChange = (newValue) => {
    if (Array.isArray(newValue) && newValue.length > 0) {
      onChange(newValue[0]);
    }
  };

  const thumbPosition = useMemo(() => {
    const thumbWidth = 28; // 7px * 4 (assuming 1rem = 4px)
    const trackWidth = 100; // 100% of track width
    const adjustedValue = Math.min(
      Math.max((value / 100) * trackWidth, thumbWidth / 2),
      trackWidth - thumbWidth / 2
    );
    return `${adjustedValue}%`;
  }, [value]);

  return (
    <SliderPrimitive.Root
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      value={[value]}
      onValueChange={handleValueChange}
      max={100}
      step={1}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-8 w-full grow overflow-hidden rounded-full bg-white/30 flex items-center">
        <div className="absolute left-2 z-10">
          <Icon size={20} className="text-black " />
        </div>
        <SliderPrimitive.Range className="absolute h-full bg-white rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-7 w-7 rounded-full border-2 border-black/10 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        style={{
          left: thumbPosition,
          transform: "translateX(-50%)",
        }}
      />
    </SliderPrimitive.Root>
  );
};

export default SliderDemo;
