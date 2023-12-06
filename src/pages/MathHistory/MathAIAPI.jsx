// Create a new file, e.g., OpenAIMathContext.js
import { createContext, useContext, useState } from 'react';

const OpenAIMathContext = createContext();

export const useCodeOpenAI = () => useContext(OpenAIMathContext);

export const CodeOpenAIProvider = ({ children }) => {
  const [replies, setReplies] = useState([]);

  const addReply = (reply) => {
    setReplies((prevReplies) => [...prevReplies, reply]);
  };

  return (
    <OpenAIMathContext.Provider value={{ replies, addReply }}>
      {children}
    </OpenAIMathContext.Provider>
  );
};