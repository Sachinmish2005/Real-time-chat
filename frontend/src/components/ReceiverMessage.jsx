import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.jpg"
import axios from "axios"
import { serverUrl } from "../main"
import { setMessages } from "../redux/messageSlice"

function ReceiverMessage({ image, message, messageId }) {

  let scroll = useRef()
  const dispatch = useDispatch()
  const { messages } = useSelector(state => state.message)
  const { selectedUser } = useSelector(state => state.user)

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" })
  }, [message, image])

  const handleDeleteForMe = async () => {
    try {
      await axios.delete(
        `${serverUrl}/api/message/delete/${messageId}`,
        {
          data: { type: "me" },
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      )

      // 🔥 REALTIME LOCAL UPDATE
      dispatch(setMessages(
        messages.filter(msg => msg._id !== messageId)
      ))

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex items-start gap-[10px] relative group'>

      {/* USER IMAGE */}
      <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 bg-white shadow-lg cursor-pointer'>
        <img src={selectedUser.image || dp} alt="" className='h-[100%]' />
      </div>

      {/* MESSAGE BOX */}
      <div
        ref={scroll}
        className='w-fit max-w-[500px] py-[10px] px-[20px] text-white bg-[#33d9c6] text-[19px]
        rounded-tl-none shadow-black shadow-lg gap-[10px] rounded-2xl flex flex-col relative'
      >

        {/* 🗑 DELETE BUTTON */}
        <span
          onClick={handleDeleteForMe}
          className="hidden group-hover:block absolute -right-6 top-0 cursor-pointer text-red-500 text-lg"
        >
          🗑
        </span>

        {image && <img src={image} alt="" className='w-[150px] rounded-lg' />}
        {message && <span>{message}</span>}

      </div>

    </div>
  )
}

export default ReceiverMessage
