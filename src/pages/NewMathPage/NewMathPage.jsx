import MathLoader from '../../components/MathLoader/MathLoader'
import MathForm from '../../components/MathForm/MathForm'
import { useMathOpenAI } from '../MathHistory/MathAIAPI'
import { getToken } from '../../utilities/users-service'
import { Row, Col, Container } from 'react-bootstrap'
import MathHistory from '../MathHistory/MathHistory'
import React, { useState } from 'react'
import axios from 'axios'

// Define the base URL for the math API
const MATH_BASE_URL = '/api/math'

const NewMathPage = () => {
  // Use the MathOpenAI context to access its values and functions
  const { addOutput } = useMathOpenAI()

  // State to manage the math input, output content, and loading status
  const [math, setMath] = useState('')
  const [outputContent, setOutputContent] = useState('')
  const [loadingSpot, setLoadingSpot] = useState(false)

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingSpot(true)

    try {
      // Get the user's token
      const mathToken = getToken()

      // Send a POST request to the math API with the math input
      const output = await axios.post(MATH_BASE_URL, { math }, {
        headers: {
          Authorization: `Bearer ${mathToken}`,
        },
      })

      // Check the output structure and update the output content
      if (output.data.message && output.data.message.content) {
        setOutputContent(output.data.message.content)
        // Add the output to the MathOpenAI context
        addOutput(output.data.message.content)
      } else {
        console.error('Error: Unexpected output structure')
        setOutputContent('Error occurred')
      }
    } catch (error) {
      console.error('Error:', error)
      setOutputContent('Error occurred')
    } finally {
      setLoadingSpot(false)
    }

    // Clear the math input after submission
    setMath('')
  }

  // Event handler for math input change
  const handleMath = (e) => {
    setMath(e.target.value)
  }

  return (
    <Container className='new-math-page'>
      <Row>
        <Col sm={8}>
          <MathLoader 
            loadingSpot={loadingSpot} 
            outputContent={outputContent} 
          />
          <MathForm 
            handleMath={handleMath} 
            handleSubmit={handleSubmit} 
            math={math}
          />
        </Col>
        <Col sm={true}>
          <MathHistory />
        </Col>
      </Row>
    </Container>
  )
}

export default NewMathPage
