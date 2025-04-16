import React from 'react'
import './chatPage.css'
import NewPrompt from '../../Components/NewPrompt/newPrompt';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';

function chatPage() {
  const chatId = useLocation().pathname.split("/").pop();
  const { getToken } = useAuth();
  const { isPending, error, data } = useQuery({
    queryKey: ["chat",chatId],
    queryFn: async () => {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/chat/${chatId}`, {
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
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
        {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.history?.map((message, i) => (
                <>
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IK_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  <div
                    className={
                      message.role === "user" ? "message user" : "message"
                    }
                    key={i}
                  >
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </>
              ))}
          {data && <NewPrompt data={data}/>}
        </div>

      </div>
    </div>
  )
}

export default chatPage