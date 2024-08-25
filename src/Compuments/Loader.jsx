import React from 'react'
import CircleLoader from "react-spinners/ClipLoader";


const Loader = () => {
    return (
      <div className="flex justify-center items-center">
  <div
    className=""
    style={{ backgroundColor: "transparent" }}
  ></div>
  <div className="flex justify-center">
    <CircleLoader size={50} />
  </div>
</div>
    );
}

export default Loader