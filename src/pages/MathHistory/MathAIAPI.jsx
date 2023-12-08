
import { createContext, useContext, useState } from 'react'

// Create a new context for the OpenAI math-related functionality
const OpenAIMathContext = createContext()

// Custom hook to access the values from the OpenAIMathContext
export const useMathOpenAI = () => useContext(OpenAIMathContext)

// Provider component to wrap around the application to provide the context values
export const MathOpenAIProvider = ({ children }) => {
  // State to manage the list of math outputs
  const [outputs, setOutputs] = useState([])

  // Function to add a new output to the list
  const addOutput = (output) => {
    setOutputs((prevOutputs) => [...prevOutputs, output])
  }

  // Provide the context values to the components within the provider
  return (
    <OpenAIMathContext.Provider value={{ outputs, addOutput }}>
      {children}
    </OpenAIMathContext.Provider>
  )
}
