import React from 'react'
import dp from "../assets/dp.jpg"
function SenderMessage() {
  return (
    <div className='w-fit max-w-[500px] py-[10px] px-[20px] text-white bg-[#33d9c6] text-[19px] rounded-tr-none relative right-0 ml-auto shadow-black shadow-lg gap-[10px] rounded-2xl
    '>
      <img src={dp} alt="" className='w-[150px] rounded-lg'/>
      <span>Hii my name is sachin </span></div>
  )
}

export default SenderMessage