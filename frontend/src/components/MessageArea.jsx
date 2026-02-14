import React from 'react'
import dp from '../assets/dp.jpg'
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
function MessageArea() {

  let { selectedUser } = useSelector(state => state.user)
  let dispatch = useDispatch()
  return (

    <div className={`lg:w-[70%] lg-flex${!selectedUser ? "flex" : "hidden"} lg:flex h-full w-full bg-slate-400`}>
      {selectedUser && <div className='w-full h-[100px] bg-[#33d9c6]
        rounded-b-[30px] shadow-gray-400 shadow-lg flex   items-center px-[20px] gap-[25px]'>

        <div className='cursor-pointer '>
          <FaArrowLeft className='w-[30px] h-[30px] text-gray-600 text-white' onClick={() => dispatch(setSelectedUser(null))} />
        </div>
        <div className='w-[60px] h-[60px]  rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 bg-white shadow-lg cursor-pointer'>

          <img src={selectedUser?.image || dp} alt="" className='h-[100%]' />
        </div>
        <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.name || "user"}</h1>


      </div>}
      {!selectedUser &&
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h1 className='font-bold text-gray-700 text-[50px]'>Welcome to chatly</h1>
          <span className='text-gray-700 font-semibold text-[30px]'>Chat Friendly...</span>
        </div>}



    </div >
  )
}

export default MessageArea