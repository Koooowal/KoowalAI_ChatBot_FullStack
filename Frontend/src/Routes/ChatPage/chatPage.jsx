import React from 'react'
import './chatPage.css'
import NewPrompt from '../../Components/NewPrompt/newPrompt';

function chatPage() {


  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">Message</div>
          <div className="message user">Message</div>
          <div className="message">Message</div>
          <div className="message user">Message</div>
          <NewPrompt/>
        </div>

      </div>
    </div>
  )
}

export default chatPage