import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  let navigate=useNavigate()
  let [userName,setUserName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [loading,setLoading] =useState(false)
   let [err,setError] =useState("")
   let dispatch=useDispatch()

  const handeSignUp=async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
        let result = await axios.post(`${serverUrl}/api/auth/signUp`,{
          userName,email,password
        },{withCredentials:true})
        dispatch(setUserData(result.data))
        navigate("/profile")
        setEmail("")
        setPassword("")
        setLoading(false)
    }catch(error){
      console.log(error)
      setLoading(false)
      setError(error?.response?.data?.message)
    }
  }
  return (
    <div className="h-screen bg-gradient-to-br from-sky-100 to-blue-300 flex items-center justify-center">

      <div className="w-[360px] bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-sky-500 py-5 text-center">
          <h1 className="text-lg font-semibold text-white">
            Welcome to <span className="font-bold">Chatly</span>
          </h1>
        </div>

        {/* Form */}
        <div className="p-6">

          <form className="flex flex-col gap-3" onSubmit={handeSignUp}>

            <input
              type="text"
              placeholder="Username"
              className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm" onChange={(e)=>setUserName(e.target.value)} value={userName}
            />

            <input
              type="email"
              placeholder="Email"
              className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
              onChange={(e)=>setEmail(e.target.value)} value={email}
            />

            <input
              type="password"
              placeholder="Password"
              className="h-9 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
              onChange={(e)=>setPassword(e.target.value)} value={password}
            />
              {err && <p className='text-red-500'>{err}</p>}
            <button
              type="submit"
              className="h-9 w-28 self-center bg-sky-500 text-white rounded-md text-sm font-medium hover:bg-sky-600 transition" disabled={loading}
            >
              {loading? "Loading...":"Sign Up"}
            </button>

          </form>

          {/* Login */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Already have an account?

              <button className="text-sky-600 text-sm font-medium hover:underline" onClick={()=>navigate("/login")}>
                Login
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignUp;
