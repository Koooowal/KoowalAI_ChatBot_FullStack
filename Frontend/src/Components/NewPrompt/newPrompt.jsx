import React, { useEffect, useRef, useState } from 'react';
import './newPrompt.css';
import Upload from '../Upload/upload';
import { IKImage } from 'imagekitio-react';
import model from '../../Lib/gemini';
import Markdown from 'react-markdown';

function NewPrompt() {
  const [question,setQuestion] = useState('');
  const [image, setImage] = useState({
    isLoading: false,
    error: '',
    dbData: {},
    aiData: {},
  });
  const [response, setResponse] = useState('');
  const endRef = useRef(null);

  const chat = model.startChat({
    history: [
      {
        role:"user",
        parts: [{ text: "AAAAAAAAAAAAAAAAA" }],
      },
      {
        role:"model",
        parts: [{ text: "BBBBBBBBBBBBB" }],
      },
    ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [response, question, image]);

  const add = async (text) => {
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
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setResponse("Error: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    setQuestion(text);
    add(text)
    
  }

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
      
      <form action="" className='newForm' onSubmit={handleSubmit}>
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