import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const HeaderFinder = ({
  selectedItem,
  currentPath,
  onGoBack,
  onGoForward,
  canGoForward,
}) => {
  return (
    <div className="h-12 border-b-[1px] border-black bg-finder-nav-dark rounded-tr-[10px] flex items-center">
      <button
        onClick={onGoBack}
        disabled={currentPath.length === 0}
        className="mr-2 ml-4 text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 rounded-[4px]"
      >
        <IoIosArrowBack size={25} />
      </button>
      <button
        onClick={onGoForward}
        disabled={!canGoForward}
        className="mr-2 ml-4 text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 rounded-[4px]"
      >
        <IoIosArrowForward size={25} />
      </button>
      <div className="text-white font-medium truncate">
        {selectedItem}
        {currentPath.length > 0 && (
          <>
            <span className="mx-2">/</span>
            {currentPath.join(" / ")}
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderFinder;
