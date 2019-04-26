import React from 'react';
import Spinner from '../../containers/Spinner';

import './Preloader.css';

const Preloader = () => {
  return (
    <div className="loader_outer">
      <span className="loader_inner">
        <Spinner />
      </span>
    </div>
  );
};

export default Preloader;
