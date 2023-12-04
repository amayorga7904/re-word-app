// Create a new file, e.g., OpenAIContext.js
import { createContext, useContext, useState } from 'react';

const OpenAIContext = createContext();

export const useOpenAI = () => useContext(OpenAIContext);

export const OpenAIProvider = ({ children }) => {
  const [responses, setResponses] = useState([]);

  const addResponse = (response) => {
    setResponses((prevResponses) => [...prevResponses, response]);
  };

  return (
    <OpenAIContext.Provider value={{ responses, addResponse }}>
      {children}
    </OpenAIContext.Provider>
  );
};
