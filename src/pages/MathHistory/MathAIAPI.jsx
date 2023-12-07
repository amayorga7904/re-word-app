
import { createContext, useContext, useState } from 'react'

const OpenAIMathContext = createContext()

export const useMathOpenAI = () => useContext(OpenAIMathContext)

export const MathOpenAIProvider = ({ children }) => {
  const [outputs, setOutputs] = useState([])

  const addOutput = (output) => {
    setOutputs((prevOutputs) => [...prevOutputs, output])
  }

  return (
    <OpenAIMathContext.Provider value={{ outputs, addOutput }}>
      {children}
    </OpenAIMathContext.Provider>
  )
}