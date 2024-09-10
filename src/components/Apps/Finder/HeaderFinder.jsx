import React from 'react'

const HeaderFinder = ({ selectedItem }) => {
  return (
    <div className="h-12 border-b-[1px] border-black bg-finder-nav-dark rounded-tr-[10px] flex items-center">
      <h4 className="ml-6 text-[1.15rem] font-normal text-white/90">
        {selectedItem}
      </h4>
    </div>
  );
};

export default HeaderFinder