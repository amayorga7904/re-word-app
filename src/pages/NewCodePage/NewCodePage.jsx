// Import necessary functions and components from external libraries and files
import CodeLoader from '../../components/CodeLoader/CodeLoader'
import CodeForm from '../../components/CodeForm/CodeForm'
import { useCodeOpenAI } from '../CodeHistory/CodeAIAPI'
import { getToken } from '../../utilities/users-service'
import { Row, Col, Container } from 'react-bootstrap'
import CodeHistory from '../CodeHistory/CodeHistory'
import React, { useState } from 'react'
import axios from 'axios'

// Define the base URL for the code API
const CODE_BASE_URL = '/api/codes'

const NewCodePage = () => {
  // Use the CodeOpenAI context to access its values and functions
  const { addReply } = useCodeOpenAI()

  // State to manage the code input, explanation content, and loading status
  const [code, setCode] = useState('')
  const [explanationContent, setExplanationContent] = useState('')
  const [loadingArea, setLoadingArea] = useState(false)

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingArea(true)

    try {
      // Get the user's token
      const codeToken = getToken()

      // Send a POST request to the code API with the code input
      const reply = await axios.post(CODE_BASE_URL, { code }, {
        headers: {
          Authorization: `Bearer ${codeToken}`,
        },
      })

      // Check the reply structure and update the explanation content
      if (reply.data.message && reply.data.message.content) {
        setExplanationContent(reply.data.message.content)
        // Add the reply to the CodeOpenAI context
        addReply(reply.data.message.content)
      } else {
        console.error('Error: Unexpected reply structure')
        setExplanationContent('Error occurred')
      }
    } catch (error) {
      console.error('Error:', error)
      setExplanationContent('Error occurred')
    } finally {
      setLoadingArea(false)
    }

    // Clear the code input after submission
    setCode('')
  }

  // Event handler for code input change
  const handleCode = (e) => {
    setCode(e.target.value)
  }

  return (
    <Container className='new-code-page'>
      <Row>
        <Col sm={8}>
          <CodeLoader 
            loadingArea={loadingArea} 
            explanationContent={explanationContent} 
          />
          <CodeForm 
            handleCode={handleCode} 
            handleSubmit={handleSubmit} 
            code={code} 
          />
        </Col>
        <Col sm={true}>
          <CodeHistory />
        </Col>
      </Row>
    </Container>
  )
}

export default NewCodePage
