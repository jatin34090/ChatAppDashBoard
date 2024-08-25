import React from 'react'

const UserMesage = ({message}) => {
  return (
    <div className=' p-2 m-2 flex justify-end '>
        <div className='text-white flex justify-end p-2 m-2 bg-blue-500 rounded-md max-w-md'>
        UserMesage: {message}
        </div>
        </div>
  )
}

export default UserMesage