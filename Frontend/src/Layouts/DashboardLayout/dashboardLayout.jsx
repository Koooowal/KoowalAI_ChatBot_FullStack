import React, { useEffect } from 'react'
import './dashboardLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import ChatList from '../../Components/ChatList/chatList'

function dashboardLayout() {

  const {userId, isLoaded} = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded) {
      if (!userId) {
        navigate("/sign-in")
      }
    }
  }, [isLoaded, userId, navigate])

  if (!isLoaded) {
    return <div className='dashboardLayout'>Loading...</div>
  }

  return (
    <div className='dashboardLayout'>
      <div className="menu"><ChatList/></div>
      <div className="content"><Outlet/></div>
    </div>
  )
}

export default dashboardLayout