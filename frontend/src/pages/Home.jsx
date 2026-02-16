import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'

function Home() {
  return (
    <div className='w-full h-[100vh] flex overflow-hidden'>
      <SideBar></SideBar>
      <MessageArea></MessageArea>
    </div>
  )
}

export default Home