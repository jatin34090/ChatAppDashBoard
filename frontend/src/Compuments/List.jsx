import React, { useState } from 'react'
import ManageTags from './ManageTags';

const List = ({data}) => {
    const [manageTags, setManageTags]  = useState(false)

const clickHandlerManageTags = () => {
    console.log("data", data);
    setManageTags(true);
}

  return (
    <div className='cursor-pointer shadow-2xl rounded-xl border-2'>
        <ul className=' max-h-[200px] overflow-auto '>
            {
                data.map((item) => {
                    return <li key={item[0]} className='hover:bg-gray-200 p-3 '>{item[1].label}</li>
                })
            }
        </ul>
        <div>
            <button className='p-6 border-t-2 w-full' onClick={clickHandler}>Manage Tags</button>
        </div>

        {manageTags && <ManageTags data={data} setManageTags={setManageTags}/>}
    </div>
  )
}

export default List