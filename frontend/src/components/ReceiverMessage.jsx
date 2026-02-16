import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp.jpg"

function ReceiverMessage({image,message}) {
   let scroll = useRef()
   let {selectedUser}=useSelector(state=>state.user)
   useEffect(()=>{
scroll.current.scrollIntoView({behavior:"smooth"})
   },[message,image])
  const handleImageScroll=()=>{
   scroll.current.scrollIntoView({behavior:"smooth"})

  }
   return (
  

      <div className='flex items-start gap-[10px]
         ' >
             <div className='w-[40px] h-[40px]  rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 bg-white shadow-lg cursor-pointer '>
           
                       <img src={selectedUser.image || dp} alt="" className='h-[100%]'  />
                     </div>
            
     
           <div ref={scroll} className='w-fit max-w-[500px] py-[10px] px-[20px] text-white bg-[#33d9c6] text-[19px] rounded-tl-none relative left-0  shadow-black shadow-lg gap-[10px] rounded-2xl flex flex-col'>
           {image && <img src={image} alt="" className='w-[150px] rounded-lg'onLoad={handleImageScroll}/>}
           {message && <span>{message}</span>
            }
           </div>
          
           
     
           
           </div>
  )
}

export default ReceiverMessage