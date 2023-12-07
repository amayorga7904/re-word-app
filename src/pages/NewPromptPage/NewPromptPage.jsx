import { Row, Col, Container } from 'react-bootstrap';
import PromptHistoryPage from "../PromptHistoryPage/PromptHistoryPage"
import { useOpenAI } from "../PromptHistoryPage/OpenAIAPI"
import { getToken } from "../../utilities/users-service";
import React, { useState } from "react"
import axios from "axios"
import PromptLoader from '../../components/PromptLoader/PromptLoader';
import PromptForm from '../../components/PromptForm/PromptForm';


const BASE_URL = '/api/openAi'

const NewPromptPage = () => {
  const { addResponse } = useOpenAI();
  const [prompt, setPrompt] = useState('')
  const [responseContent, setResponseContent] = useState('')
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.post(BASE_URL, { prompt }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });  

      console.log('API Response:', response);    

      if (response.data.message && response.data.message.content) {
        setResponseContent(response.data.message.content);
        addResponse(response.data.message.content);
      } else {
        console.error('Error: Unexpected response structure');
        setResponseContent('Error occurred');
      }

    } catch (error) {
      console.error('Error:', error)
      setResponseContent('Error occurred')
    } finally {
      setLoading(false)
    }
    setPrompt('')
  }

  const handlePrompt = (e) => {
    setPrompt(e.target.value)
  }

  return (
    <Container className="new-prompt-page">
        <Row>
          <Col sm={8}>
            <PromptLoader loading={loading} responseContent={responseContent} />
            <PromptForm handlePrompt={handlePrompt} handleSubmit={handleSubmit} prompt={prompt} />
          </Col>
        <Col sm={true}>
          <PromptHistoryPage />
        </Col>
      </Row>
    </Container>
  )
}

export default NewPromptPage