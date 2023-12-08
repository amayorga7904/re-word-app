
import { createContext, useContext, useState } from 'react'

// Create a new context for the OpenAI functionality
const OpenAIContext = createContext()

// Custom hook to easily access the values and functions provided by the OpenAI context
export const useOpenAI = () => useContext(OpenAIContext)

// OpenAIProvider component definition
export const OpenAIProvider = ({ children }) => {
  // State to manage the list of responses
  const [responses, setResponses] = useState([])

  // Function to add a response to the list
  const addResponse = (response) => {
    setResponses((prevResponses) => [...prevResponses, response])
  }

  // Provide the context values and functions to the components in the tree
  return (
    <OpenAIContext.Provider value={{ responses, addResponse }}>
      {children}
    </OpenAIContext.Provider>
  )
}

