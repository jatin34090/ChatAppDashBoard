
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Li = ({ url, img }) => {
  const location = useLocation();

  return (
    <div className='flex justify-center p-3' style={{ backgroundColor: location.pathname.includes(url) && "gray"
     }}>
      <Link
        to={url}
        style={{
          backgroundColor: location.pathname.includes(url) ? "gray" : "black"
        }}
      >
        <img className='w-6' src={`${img}`} alt="" />
      </Link>
    </div>
  );
};

export default Li;
