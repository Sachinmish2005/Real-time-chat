import React from 'react'

function ReceiverMessage({image,message}) {
  return (
     <div className='w-fit max-w-[500px] py-[10px] px-[20px] text-white bg-[#1da091] text-[19px] rounded-tl-none relative left-0 shadow-black shadow-lg gap-[10px] rounded-2xl flex flex-col
        '>
         {image && <img src={image} alt="" className='w-[150px] rounded-lg'/>}
      {message && <span>{message}</span> }
          </div>
  )
}

export default ReceiverMessage