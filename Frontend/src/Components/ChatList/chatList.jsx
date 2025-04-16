import React from 'react'
import './chatList.css'
import { Link } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

function chatList() {
  const { getToken } = useAuth();
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/userChats`, {
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return response.json();
    },
  });



  return (
    <div className='chatList'>
      <span className='title'>DASHBOARD</span>
      <Link to='/dashboard'>Create a new Chat</Link>
      <Link>Explore Koowal AI</Link>
      <Link>Contact</Link>
      <hr />
      <span className='title'>RECENT CHATS</span>
      <div className="list">
      {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
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