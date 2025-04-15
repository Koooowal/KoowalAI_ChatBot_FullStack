import React from 'react'
import './chatList.css'
import { Link } from 'react-router-dom'

function chatList() {
  return (
    <div className='chatList'>
      <span className='title'>DASHBOARD</span>
      <Link to='/dashboard'>Create a new Chat</Link>
      <Link>Explore Koowal AI</Link>
      <Link>Contact</Link>
      <hr />
      <span className='title'>RECENT CHATS</span>
      <div className="list">
        <Link to='/'>My chat title</Link>
        <Link to='/'>My chat title</Link>
        <Link to='/'>My chat title</Link>
        <Link to='/'>My chat title</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Koowal AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  )
}

export default chatList