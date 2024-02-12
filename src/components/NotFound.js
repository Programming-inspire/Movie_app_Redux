import React from 'react';
import MyImage from '../assets/noresult.jpeg';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full overflow-hidden">
      <div className="text-center">
          <img src={MyImage} alt="No Result Found" className="mb-4 object-contain" />
      
        <p className="font-bold text-2xl">No Result Found</p>
      </div>
    </div>
  );
};

export default NotFound;