import React from 'react'
import Li from "./Li";
import chatImg from '../assets/chatImg.png';
import analyticsImg from '../assets/analyticsImg.png';


const Sidebar = () => {
  return (
    <div className=' h-full flex flex-col justify-center bg-black '>
        <div className='mb-3'>
        <Li url={"/chats"} img={chatImg} key={1}></Li>

        </div>
        {/* <hr /> */}
        <div className='mt-3 flex justify-center items-center'>

        <Li url={"/analytic"} img={analyticsImg} key={2}></Li>
        </div>
    </div>
  )
}

export default Sidebar