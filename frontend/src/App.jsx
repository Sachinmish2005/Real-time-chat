import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import { useDispatch, useSelector } from 'react-redux'
import Profile from './pages/Profile.jsx'
import getCuurentUser from './customHooks/getCurrentUser.jsx'
import Home from './pages/Home.jsx'
import getOtherUsers from './customHooks/getOtherUsers.jsx'
import {io} from "socket.io-client"
import { serverUrl } from './main.jsx'
import { setOnlineUsers, setSocket } from './redux/userSlice.js'

function App() {
    getCuurentUser()
    getOtherUsers()
    let {userData,socket,onlineUsers}=useSelector(state=>state.user)
    let dispatch=useDispatch()

    useEffect(()=>{
      if(userData){
      const socketio =io(`${serverUrl}`,{
        query:{
          userId:userData?._id
        }

        
      
      })
      dispatch(setSocket(socketio))
       socketio.on("getOnlineUsers",(users)=>{
      dispatch(setOnlineUsers(users))
    })

    return ()=>{
      socketio.off("getOnlineUsers")
      socketio.close()}}
    else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
    },[userData,dispatch])

   
    

  return (
 <Routes>
  <Route path='/login' element={!userData?<Login/>:<Navigate to="/"/>} />
  <Route path='/signUp' element={!userData?<SignUp/>:<Navigate to="/profile"/>}/>
  <Route path="/" element={userData?<Home/>:<Navigate to="/login"/>}/>
  <Route path="/profile" element={userData?<Profile/>:<Navigate to="/signUp"/>}/> 
 </Routes>
  )
}

export default App