import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import { useSelector } from 'react-redux'
import Profile from './pages/Profile.jsx'
import getCuurentUser from './customHooks/getCurrentUser.jsx'
import Home from './pages/Home.jsx'
import getOtherUsers from './customHooks/getOtherUsers.jsx'

function App() {
    getCuurentUser()
    getOtherUsers()
    let {userData}=useSelector(state=>state.user)
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