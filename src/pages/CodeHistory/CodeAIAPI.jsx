
import { createContext, useContext, useState } from 'react';

const OpenAICodeContext = createContext();

export const useCodeOpenAI = () => useContext(OpenAICodeContext);

export const CodeOpenAIProvider = ({ children }) => {
  const [replies, setReplies] = useState([]);

  const addReply = (reply) => {
    setReplies((prevReplies) => [...prevReplies, reply]);
  };

  return (
    <OpenAICodeContext.Provider value={{ replies, addReply }}>
      {children}
    </OpenAICodeContext.Provider>
  );
};