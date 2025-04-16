import React from 'react'
import './dashboardPage.css'
import { useMutation,useQueryClient} from '@tanstack/react-query'
import { useNavigate} from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react';

function dashboardPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  

  const mutation = useMutation({
    mutationFn: async (text) => {
      const token = await getToken();
      return fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/chat`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = e.target.text.value;
    if (!text) return;
    mutation.mutate(text);
  }

  return (
    <div className='dashboardPage'>
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>Koowal AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a new chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze image</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder='Ask me anything' name='text'/>
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default dashboardPage