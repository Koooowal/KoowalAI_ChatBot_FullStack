import React, { useEffect, useRef, useState } from 'react';
import './newPrompt.css';
import Upload from '../Upload/upload';
import { IKImage } from 'imagekitio-react';
import model from '../../Lib/gemini';
import Markdown from 'react-markdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

function NewPrompt({data}) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [image, setImage] = useState({
    isLoading: false,
    error: '',
    dbData: {},
    aiData: {},
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  const chat = model.startChat({
    history: data?.history?.map(({ role, parts }) => ({
      role,
      parts: [{ text: parts[0].text }],
    })) || [],
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [response, question, image.dbData]);
  

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/chat/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          question: question.length ? question : undefined,
          answer: response,
          image: image.dbData?.filePath || undefined,
         }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setResponse("");
          setImage({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const parts = [];
      if (Object.entries(image.aiData).length) {
        parts.push(image.aiData);
      }
      parts.push({text});
      const result = await model.generateContentStream({
        contents: [{ role: "user", parts }]
      });
      let accumulatedResponse = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedResponse += chunkText;
        setResponse(accumulatedResponse);
      }
      mutation.mutate();
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setResponse("Error: " + error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text);
  };
  
  

  useEffect(() => {
    if(data?.history?.length===1){
      add(data.history[0].parts[0].text);
    }
  }, []);
  
  return (
    <>
      {image.isLoading && <div className="loading"> Loading... </div>}
      
      {image.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IK_ENDPOINT}
          path={image.dbData.filePath}
          transformation={[{width: "380"}]}
        />
      )}

      {question && <div className="message user">{question}</div>}
      {response && <div className="message"><Markdown>{response}</Markdown></div>}     
      <div className="endChat" ref={endRef}></div>
      
      <form action="" className='newForm' onSubmit={handleSubmit} ref={formRef}>
        <Upload setImage={setImage}/>
        <input type="file" multiple={false} hidden id='file'/>
        <input type="text" name='text' placeholder='Ask anything...'/>
        <button type='submit'>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
}

export default NewPrompt;