import { createContext, useContext, useState } from 'react'

// Create a new context
const OpenAICodeContext = createContext()

// Custom hook to access the context value
export const useCodeOpenAI = () => useContext(OpenAICodeContext)

// Provider component to wrap the application and provide the context value
export const CodeOpenAIProvider = ({ children }) => {
  // State to store replies, initialized with an empty array
  const [replies, setReplies] = useState([])

  // Function to add a new reply to the state
  const addReply = (reply) => {
    // Update the state by spreading the previous replies and adding the new reply
    setReplies((prevReplies) => [...prevReplies, reply])
  }

  // Provide the context value to the components within the provider
  return (
    <OpenAICodeContext.Provider value={{ replies, addReply }}>
      {children}
    </OpenAICodeContext.Provider>
  )
}
