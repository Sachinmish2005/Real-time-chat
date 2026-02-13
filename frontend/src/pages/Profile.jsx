import React, { useRef, useState } from 'react'
import dp from "../assets/dp.jpg"
import { FaCameraRetro } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setUserData} from '../redux/userSlice'
import {serverUrl} from '../main'
function Profile() {
  let {userData}=useSelector(state=>state.user)
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let [name,setName]=useState(userData?.name||"")
  let [frontendImage,setFrontendImage]=useState(userData?.image||dp)
  let[backendImage,setBackendImage]=useState(null)
  let image=useRef()
  let[saving,setSaving]=useState(false)

  const handleImage=(e)=>{
    let file=e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleProfile=async (e)=>{
    e.preventDefault()
    setSaving(true)
    try {
      let formData=new FormData()
      formData.append("name",name)
      if(backendImage){
        formData.append("image",backendImage)
      }
      let result=await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true})
      setSaving(false)
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
      setSaving(false)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]'>
      <div className='fixed top-[20px] left-[20px] '>
        <FaArrowLeft className='w-[30px] h-[30px] text-gray-600 cursor-pointer' onClick={()=>navigate("/")} />
      </div>
      <div className=' bg-white border-2  rounded-full border-[#20c7ff] shadow-gray-400 shadow-lg  relative' onClick={()=>image.current.click()}>
        <div className='w-[200px] h-[200px]  rounded-full overflow-hidden flex justify-center items-center'>
          <img src={frontendImage} alt="" className='h-[100%]'/>
          </div>
          <div className='absolute bottom-4 text-gray-700 right-4 w-[35px] h-[35px]  rounded-full bg-[#20c7ff] flex justify-center items-center shadow-gray-500 shadow-lg'>
          <FaCameraRetro className='text-gray-700 w-[25px] h-[25px]'/>
          </div>

      </div>
      <form className='w-[95%] h-[600px] max-w-[500px] flex flex-col gap-[20px] items-center justyfy-center'onSubmit={handleProfile}>
        <input type="file" accept='image/*' ref={image} hidden onChange={handleImage}/>
        <input type="text" placeholder='Enter your name' className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none shadow-gray-500 shadow-lg focus:ring-2 focus:ring-sky-400 text-sm"onChange={(e)=>setName(e.target.value)} value={name}/>

        <input type='text' readOnly className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none shadow-gray-500 shadow-lg focus:ring-2 focus:ring-sky-400 text-gray-400 text-sm" value={userData.userName}/>

        <input type='email' readOnly className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none shadow-gray-500 shadow-lg focus:ring-2 focus:ring-sky-400 text-gray-400 text-sm" value={userData.email}/>

        <button className="h-9 w-28 self-center bg-sky-500 text-white rounded-md text-sm font-medium hover:bg-sky-600 transition" disabled={saving}>{saving?"saving...":"Save profile"}</button>


      </form>
    </div>
  )
}

export default Profile