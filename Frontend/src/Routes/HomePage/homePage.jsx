import React, {useState} from 'react'
import './homePage.css'
import { Link } from 'react-router-dom'
import { TypeAnimation } from "react-type-animation";


function homePage() {
  const [typingStatus, setTypingStatus] = useState("human1");

  
  return (
    <div className='homepage'>
      <img src="./orbital.png" alt="" className='orbital'/>
      <div className="left">
        <h1>Koowal AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat sint
          dolorem doloribus, architecto dolor.
        </h3>
        <Link to={"/dashboard"}>Get started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
            <img src="./hero-image.png" alt="" className='bot' />
            <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "hero-image.png"
                
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                "Why Koowal AI?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Because it is awesome!",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "What is Koowal AI?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Your new best friend! :)",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default homePage