import React from 'react'

const Content = ({ selectedItem }) => {
  return (
    <div className="w-full h-[calc(100%-3rem)]">
      {/* Main content area */}
      {selectedItem && (
        <div className="bg-finder-body-dark shadow w-full h-full">
          <h2 className="text-xl font-bold">{selectedItem}</h2>
          <p>Content for {selectedItem} goes here.</p>
        </div>
      )}
    </div>
  );
};

export default Content