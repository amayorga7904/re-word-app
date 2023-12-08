import PromptHistoryPage from '../PromptHistoryPage/PromptHistoryPage'
import PromptLoader from '../../components/PromptLoader/PromptLoader'
import PromptForm from '../../components/PromptForm/PromptForm'
import { useOpenAI } from '../PromptHistoryPage/OpenAIAPI'
import { getToken } from '../../utilities/users-service'
import { Row, Col, Container } from 'react-bootstrap'
import React, { useState } from 'react'
import axios from 'axios'

// Define the base URL for the OpenAI API
const BASE_URL = '/api/openAi'

const NewPromptPage = () => {
  // Use the OpenAI context to access its values and functions
  const { addResponse } = useOpenAI()

  // State to manage the prompt input, response content, and loading status
  const [prompt, setPrompt] = useState('')
  const [responseContent, setResponseContent] = useState('')
  const [loading, setLoading] = useState(false)

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get the user's token
      const token = getToken()

      // Send a POST request to the OpenAI API with the prompt input
      const response = await axios.post(BASE_URL, { prompt }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Check the response structure and update the response content
      if (response.data.message && response.data.message.content) {
        setResponseContent(response.data.message.content)
        // Add the response to the OpenAI context
        addResponse(response.data.message.content)
      } else {
        console.error('Error: Unexpected response structure')
        setResponseContent('Error occurred')
      }

    } catch (error) {
      console.error('Error:', error)
      setResponseContent('Error occurred')
    } finally {
      setLoading(false)
    }

    // Clear the prompt input after submission
    setPrompt('')
  }

  // Event handler for prompt input change
  const handlePrompt = (e) => {
    setPrompt(e.target.value)
  }

  return (
    <Container className='new-prompt-page'>
      <Row>
        <Col sm={8}>
          <PromptLoader 
            loading={loading} 
            responseContent={responseContent} 
          />
          <PromptForm 
            handlePrompt={handlePrompt} 
            handleSubmit={handleSubmit} 
            prompt={prompt} 
          />
        </Col>
        <Col sm={true}>
          <PromptHistoryPage />
        </Col>
      </Row>
    </Container>
  )
}

export default NewPromptPage
