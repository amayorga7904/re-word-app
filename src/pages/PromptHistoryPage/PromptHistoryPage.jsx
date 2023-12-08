import { getToken, getUser } from '../../utilities/users-service'
import PromptCard from '../../components/PromptCard/PromptCard'
import { Container, Row, Col, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import './PromptHistoryPage.css'
import axios from 'axios'


const HISTORY_API_URL = '/api/openAi/history'

const PromptHistoryPage = () => {
  const [prompts, setPrompts] = useState([])
  const [promptTitle, setPromptTitle] = useState('')
  
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

  const handlePromptTitleChange = (e) => {
    setPromptTitle(e.target.value.toUpperCase())
  }

  const updatePromptTitle = async (promptId) => {
    try {
    const currentUser = getUser()
    const token = await getToken()
    await axios.put(`${HISTORY_API_URL}/${currentUser._id}/${promptId}`, 
    { promptTitle }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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