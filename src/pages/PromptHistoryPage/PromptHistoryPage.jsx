// Import necessary functions and components from external libraries and files
import { getToken, getUser } from '../../utilities/users-service'
import PromptCard from '../../components/PromptCard/PromptCard'
import { Container, Row, Col, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import './PromptHistoryPage.css' // Assuming you have a CSS file for styling
import axios from 'axios'

// Define the API endpoint for fetching prompt history
const HISTORY_API_URL = '/api/openAi/history'

const PromptHistoryPage = () => {
  // State to manage the list of prompts and the title for updating
  const [prompts, setPrompts] = useState([])
  const [promptTitle, setPromptTitle] = useState('')

  // Function to fetch prompt history from the server
  const getHistory = async () => {
    try {
      const currentUser = getUser()
      if (currentUser) {
        const token = getToken()
        const response = await axios.get(`${HISTORY_API_URL}/${currentUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPrompts(response.data)
      } else {
        console.error('User not defined')
      }
    } catch (error) {
      console.error('Error fetching prompts:', error)
    }
  }

  // Event handler for prompt title input change
  const handlePromptTitleChange = (e) => {
    setPromptTitle(e.target.value.toUpperCase())
  }

  // Function to update the title of a prompt entry
  const updatePromptTitle = async (promptId) => {
    try {
      const currentUser = getUser()
      const token = await getToken()
      await axios.put(
        `${HISTORY_API_URL}/${currentUser._id}/${promptId}`,
        { promptTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setPromptTitle('')
      getHistory()
    } catch (error) {
      console.error('Error updating prompt title:', error)
    }
  }

  return (
    <Container className='prompt-page'>
      <Row>
        <Col>
          <Button
            variant='dark'
            onClick={getHistory}
          >
            Get History
          </Button>
        </Col>
        <br />
        <br />
      </Row>
      <PromptCard
        prompts={prompts}
        promptTitle={promptTitle}
        handlePromptTitleChange={handlePromptTitleChange}
        updatePromptTitle={updatePromptTitle}
        getHistory={getHistory}
      />
      <br />
      <br />
    </Container>
  )
}

export default PromptHistoryPage
