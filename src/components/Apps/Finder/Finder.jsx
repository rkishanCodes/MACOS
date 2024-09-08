import React from "react";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";

const Finder = React.memo(() => {
return (
<ResizableWindow appName="finder">
<div className="relative">
<MenuActions appName="finder" />
finder
<div onClick={() => console.log("clcikd finder")}>click me</div>
</div>
</ResizableWindow>
);
});

export default Finder;
