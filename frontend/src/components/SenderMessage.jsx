import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.jpg"
import axios from "axios"
import { serverUrl } from "../main"
import { useState } from 'react'
import { setMessages } from "../redux/messageSlice"

function SenderMessage({image,message,messageId}) {
  let scroll = useRef()
  let {userData}=useSelector(state=>state.user)
  const [showDeleteMenu, setShowDeleteMenu] = useState(false)
const dispatch = useDispatch()
const { messages } = useSelector(state => state.message)

   useEffect(()=>{
    scroll.current.scrollIntoView({behavior:"smooth"})
  
     },[message,image])
  const handleImageScroll=()=>{
   scroll.current.scrollIntoView({behavior:"smooth"})

  }
 const handleDelete = async (type) => {
  try {
    await axios.delete(
  `${serverUrl}/api/message/delete/${messageId}`,
  {
    data: { type },
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  }
)
 if (type === "me") {
      dispatch(
        setMessages(
          messages.filter(msg => msg._id !== messageId)
        )
      )
    }

    setShowDeleteMenu(false)
  } catch (error) {
    console.log(error)
  }
}


  return (
  <div className='flex items-start gap-[10px] relative group'>

    {/* MESSAGE BOX */}
    <div
      ref={scroll}
      className='w-fit max-w-[500px] py-[10px] px-[20px] text-white bg-[#33d9c6] text-[19px]
      rounded-tr-none ml-auto shadow-black shadow-lg gap-[10px] rounded-2xl flex flex-col relative'
    >

      {/* 🗑 DELETE BUTTON */}
     
       <span
  onClick={() => setShowDeleteMenu(true)}
  className="hidden group-hover:block absolute -left-6 top-0 cursor-pointer text-red-500 text-lg"
>
  🗑
</span>


      {image && (
        <img
          src={image}
          alt=""
          className='w-[150px] rounded-lg'
          onLoad={handleImageScroll}
        />
      )}

      {message && <span>{message}</span>}
      {showDeleteMenu && (
    <div className="absolute bg-white shadow-lg rounded-lg p-2 right-0 top-8 z-50 flex flex-col text-black">

      <button
        onClick={() => handleDelete("me")}
        className="px-3 py-1 hover:bg-gray-200 text-left"
      >
        Delete for me
      </button>

      <button
        onClick={() => handleDelete("everyone")}
        className="px-3 py-1 hover:bg-gray-200 text-left"
      >
        Delete for everyone
      </button>

    </div>
  )}
    </div>

    {/* USER IMAGE */}
    <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 bg-white shadow-lg cursor-pointer'>
      <img src={userData.image || dp} alt="" className='h-[100%]' />
    </div>

  </div>
)

}

export default SenderMessage