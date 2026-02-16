import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp.jpg"

function SenderMessage({image,message}) {
  let scroll = useRef()
  let {userData}=useSelector(state=>state.user)
   useEffect(()=>{
    scroll.current.scrollIntoView({behavior:"smooth"})
  
     },[message,image])
  const handleImageScroll=()=>{
   scroll.current.scrollIntoView({behavior:"smooth"})

  }
  return (
    <div className='flex items-start gap-[10px]
    ' >
       

      <div ref={scroll} className='w-fit max-w-[500px] py-[10px] px-[20px] text-white bg-[#33d9c6] text-[19px] rounded-tr-none relative right-0 ml-auto shadow-black shadow-lg gap-[10px] rounded-2xl flex flex-col'>
      {image && <img src={image} alt="" className='w-[150px] rounded-lg'onLoad={handleImageScroll}/>}
      {message && <span>{message}</span>
       }
      </div>
      <div className='w-[40px] h-[40px]  rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 bg-white shadow-lg cursor-pointer '>
      
                  <img src={userData.image || dp} alt="" className='h-[100%]'  />
                </div>
      

      
      </div>
  )
}

export default SenderMessage