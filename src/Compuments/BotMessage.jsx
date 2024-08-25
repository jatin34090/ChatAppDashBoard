import React from 'react'

const BotMessage = ({message}) => {
  return (
    <div className=' p-2 m-2 flex '>
        <span className='text-black rounded-md flex justify-start p-2 m-2 bg-gray-100 max-w-md'>
        BotMessage: {message}
        </span>
    </div>
  )
}

export default BotMessage