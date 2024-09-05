import React from "react";
import { useGesture } from "@use-gesture/react";

const TestGesture = () => {
  const bind = useGesture({
    onDrag: ({ offset: [ox, oy] }) => {
      console.log("Dragged:", { ox, oy });
    },
    onDragStart: () => {
      console.log("Drag started");
    },
    onDragEnd: () => {
      console.log("Drag ended");
    },
  });

  return (
    <div
      {...bind()}
      style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
    >
      Drag me
    </div>
  );
};

export default TestGesture;
