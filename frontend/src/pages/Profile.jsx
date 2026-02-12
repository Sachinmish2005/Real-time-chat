import React from 'react'
import dp from "../assets/dp.jpg"
import { FaCameraRetro } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Profile() {
  let {userData}=useSelector(state=>state.user)
  let navigate=useNavigate()
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]'>
      <div className='fixed top-[20px] left-[20px] '>
        <FaArrowLeft className='w-[30px] h-[30px] text-gray-600 cursor-pointer' onClick={()=>navigate("/")} />
      </div>
      <div className=' bg-white border-2  rounded-full border-[#20c7ff] shadow-gray-400 shadow-lg  relative'>
        <div className='w-[200px] h-[200px]  rounded-full overflow-hidden'>
          <img src={dp} alt="" className='h-[100%]'/>
          </div>
          <FaCameraRetro className='absolute bottom-4 text-gray-700 w-[28px] h-[28px] right-4'/>

      </div>
      <form className='w-[95%] h-[600px] max-w-[500px] flex flex-col gap-[20px] items-center justyfy-center'>

        <input type="text" placeholder='Enter your name' className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"/>

        <input type='text' readOnly className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-400 text-sm" value={userData.userName}/>

        <input type='email' readOnly className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-400 text-sm" value={userData.email}/>

        <button className="h-9 w-28 self-center bg-sky-500 text-white rounded-md text-sm font-medium hover:bg-sky-600 transition">Save profile</button>


      </form>
    </div>
  )
}

export default Profile