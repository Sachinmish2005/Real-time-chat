import React, { useRef, useState } from 'react'
import dp from '../assets/dp.jpg'
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import { useEffect } from "react";

import { PiImagesFill } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { serverUrl } from '../main';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';
import { BsThreeDotsVertical } from "react-icons/bs"

function MessageArea() {
  

  let { selectedUser ,userData,socket} = useSelector(state => state.user)
  let [showPicker, setShowPicker] = useState(false)
  let dispatch = useDispatch()
  let [input, setInput] = useState("")
  let [frontendImage , setFrontendImage]=useState(null)
  let [backendImage , setBackendImage]=useState(null)
  let image=useRef()
  let {messages}=useSelector(state=>state.message)
  const [showChatMenu, setShowChatMenu] = useState(false)
const [loadingMessages, setLoadingMessages] = useState(false)

  const handleImage =(e)=>{
    let file= e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  const handleSendMessage=async (e)=>{
    e.preventDefault()

    if(input.length==0 && backendImage==null){
      return null
    }
    try {
      let formData = new FormData()
      formData.append("message",input)
      if(backendImage){
        formData.append("image",backendImage)
      }
      let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,{withCredentials:true})
        dispatch(setMessages([...messages,result.data]))
      setInput('')
      setFrontendImage(null)
      setBackendImage(null)
    } catch (error) {
      console.log(error)
    }
  }
useEffect(() => {

  if (!selectedUser?._id) return;

  const fetchMessages = async () => {

    setLoadingMessages(true)

    // 🔥 PURANE MESSAGES HATA DO
    dispatch(setMessages([]))

    try {
      const res = await axios.get(
        `${serverUrl}/api/message/get/${selectedUser._id}`,
        { withCredentials: true }
      )

      dispatch(setMessages(res.data))

    } catch (error) {
      console.log(error)
    } finally {
      setLoadingMessages(false)
    }
  }

  fetchMessages()

}, [selectedUser?._id])


useEffect(() => {

  socket.on("newMessage", (mess) => {

    dispatch(setMessages(prev => [...prev, mess]))

  })

  return () => socket.off("newMessage")

}, [])



  const onEmojiClick = (emojiData) => {
    setInput(prevInput => prevInput + emojiData.emoji)
    setShowPicker(false)
  }

useEffect(() => {

  socket.on("messageDeleted", (id) => {

    dispatch(setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg._id === id ? { ...msg, isDeleted: true } : msg
      )
    ))

  })

  return () => socket.off("messageDeleted")

}, [])


const handleDeleteChat = async () => {
  try {

    await axios.delete(
      `${serverUrl}/api/message/delete-chat/${selectedUser._id}`,
      { withCredentials: true }
    )

    dispatch(setMessages([]))
    setShowChatMenu(false)

  } catch (error) {
    console.log(error)
  }
}


  return (

    <div className={`lg:w-[70%] ${selectedUser ? "flex" : "hidden"} lg:flex 
    h-full w-full bg-slate-400 border-l-2 border-gray-300 flex-col`}>

      {/* HEADER */}

      {selectedUser &&
  <div className='w-full h-[100px] bg-[#33d9c6]
  rounded-b-[30px] shadow-lg flex items-center px-[20px] gap-[25px] sticky top-0 z-50
'>

    <div className='cursor-pointer'>
      <FaArrowLeft
        className='w-[30px] h-[30px] text-white'
        onClick={() => dispatch(setSelectedUser(null))}
      />
    </div>

    <div className='w-[60px] h-[60px] rounded-full overflow-hidden bg-white shadow-lg'>
      <img src={selectedUser?.image || dp} className='h-full w-full object-cover' />
    </div>

    <h1 className='text-white font-semibold text-[20px]'>
      {selectedUser?.name}
    </h1>

    {/* ✅ THREE DOTS MENU */}
    <div className="ml-auto relative">

      <BsThreeDotsVertical
        onClick={() => setShowChatMenu(prev => !prev)}
        className="text-white text-[22px] cursor-pointer"
      />

      {showChatMenu && (
        <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg p-2">

          <button
            onClick={handleDeleteChat}
            className="px-4 py-1 z-[999]
 hover:bg-gray-200 w-full text-left "
          >
            Delete full chat
          </button>

        </div>
      )}

    </div>

  </div>
}


      {/* MESSAGES AREA */}

      {selectedUser &&
  <div className='w-full flex-1 flex flex-col overflow-y-auto px-[20px] py-[50px] gap-[20px]'>

    {showPicker &&
      <div className='absolute bottom-[90px] left-[20px] z-50'>
        <EmojiPicker width={250} height={350} onEmojiClick={onEmojiClick} />
      </div>
    }

    {/* ✅ LOADING UI */}
    {loadingMessages ? (

      <div className="text-center text-gray-600 mt-10">
        Loading chat...
      </div>

    ) : (

      messages?.map((mess) => {

        // delete for me
        if (mess.deletedFor?.includes(userData._id)) return null

        // delete for everyone
        if (mess.isDeleted) {
          return (
            <div key={mess._id} className='text-center text-gray-500 text-sm'>
              This message was deleted
            </div>
          )
        }

        return (
          <div key={mess._id}>
            {mess.sender?.toString() === userData?._id?.toString()
              ? (
                <SenderMessage
                  image={mess.image}
                  message={mess.message}
                  messageId={mess._id}
                />
              ) : (
                <ReceiverMessage
                  image={mess.image}
                  message={mess.message}
                  messageId={mess._id}
                />
              )
            }
          </div>
        )
      })

    )}

  </div>
}


      {/* INPUT AREA */}

      {selectedUser &&
        <div className='w-full flex items-center justify-center p-[15px]'>
          <img src={frontendImage} alt='' className='w-[180px] absolute bottom-[100px] right-[10%] rounded-lg shadow-gray-400 shadow-lg'/>

          <form className='w-[95%] lg:w-[80%] h-[60px] bg-[#33d9c6] rounded-full shadow-lg 
          flex items-center gap-[20px] px-[20px]' onSubmit={handleSendMessage}>

            <div onClick={() => setShowPicker(prev => !prev)}>
              <RiEmojiStickerLine className='w-[25px] h-[25px] text-white cursor-pointer' />
            </div>
            <input type='file' accept='image/*' ref={image} hidden onChange={handleImage}/>

            <input
              type="text"
              className='w-full h-full px-[10px] outline-none text-[19px] text-white bg-transparent placeholder-white'
              placeholder='Message'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div onClick={()=>image.current.click()}>

            <PiImagesFill className='w-[25px] h-[25px] text-white cursor-pointer' />
            </div>
         <button>

            <IoSend className='w-[25px] h-[25px] text-white cursor-pointer' />
            </button>
            

          </form>

        </div>
      }

      {/* WELCOME SCREEN */}

      {!selectedUser &&
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h1 className='font-bold text-gray-700 text-[50px]'>Welcome to chatly</h1>
          <span className='text-gray-700 font-semibold text-[30px]'>Chat Friendly...</span>
        </div>
      }

    </div>
  )
}

export default MessageArea
