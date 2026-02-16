import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

function SenderMessage({image,message}) {
  let scroll = useRef()
  
   useEffect(()=>{
    scroll.current.scrollIntoView({behavior:"smooth"})
  
     },[message,image])
  const handleImageScroll=()=>{
   scroll.current.scrollIntoView({behavior:"smooth"})

  }
  return (
    <div className='w-fit max-w-[500px] py-[10px] px-[20px] text-white bg-[#33d9c6] text-[19px] rounded-tr-none relative right-0 ml-auto shadow-black shadow-lg gap-[10px] rounded-2xl flex flex-col
    ' >
      <div ref={scroll}>
      {image && <img src={image} alt="" className='w-[150px] rounded-lg'onLoad={handleImageScroll}/>}
      {message && <span>{message}</span>
       }
      </div>
      

      
      </div>
  )
}

export default SenderMessage