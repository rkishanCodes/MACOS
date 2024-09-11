import React from "react";
import { useSelector } from "react-redux";
import folderIcon from "../../../assets/finder/folder.svg";

const Content = ({ selectedItem }) => {
  const FinderSlice = useSelector((state) => state.finder);
  // console.log(FinderSlice);
  // console.log(FinderSlice["folders"]);
  //   console.log(FinderSlice["folders"]["Applications"]);

  return (
    <div className="w-full h-[calc(100%-3rem)] bg-finder-body-dark rounded-br-[10px]">
      {/* Main content area */}
      {selectedItem && (
        <div className="  w-full h-full ">
          {/* {console.log(FinderSlice["folders"][selectedItem][0]["name"])} */}

          <div className="grid grid-cols-[repeat(auto-fill,_minmax(90px,_1fr))] grid-rows-[repeat(auto-fill,_minmax(100px,_1fr))] gap-2">
            {/* {FinderSlice["folders"][selectedItem].map((appFolder) => (
              <div
                key={appFolder}
                className="flex flex-col justify-center items-center"
              >
                <img
                  src={folderIcon}
                  alt=""
                  className="w-[3.75rem] h-[3.25rem]"
                />
                <h6 className="border-2 text-center">{appFolder["name"]}</h6>
              </div>
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
