import React from 'react';
import Navbar from './Navbar';

const WithNavbar = (WrappedComponent) => {
  return (props) => {

    return (
      <div>
        <Navbar/>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default WithNavbar;