import { Button, Spinner, Row, Col, Form, Container } from 'react-bootstrap';
import PromptHistoryPage from "../PromptHistoryPage/PromptHistoryPage"
import { useOpenAI } from "../PromptHistoryPage/OpenAIAPI"
import { getToken } from "../../utilities/users-service";
import React, { useState } from "react"
import axios from "axios"
import PromptLoader from '../../components/PromptLoader/PromptLoader';
import PromptForm from '../../components/PromptForm/PromptForm';

//endpoint for OpenAI API chat completions
const BASE_URL = '/api/openAi'


const NewPromptPage = () => {
  const { addResponse } = useOpenAI();
  //used to update the value of prompt
  const [prompt, setPrompt] = useState('')
  //updates stateContent based on response recieved from backend
  const [responseContent, setResponseContent] = useState('')
  const [loading, setLoading] = useState(false);
  //prevents page from refreshing
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const token = await getToken();
      //async POST request to endpoint with prompt sent to req.body
      const response = await axios.post(BASE_URL, { prompt }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });  
      console.log('API Response:', response);    
      //responseContent is set to the first value of the API response
      if (response.data.message && response.data.message.content) {
        setResponseContent(response.data.message.content);
        addResponse(response.data.message.content);

      } else {
        console.error('Error: Unexpected response structure');
        setResponseContent('Error occurred');
      }
            // if (response.data.choices && response.data.choices.length > 0) {
            //   setResponseContent(response.data.choices[0].message.content);
            // } else {
            //   // Handle the case when choices array is empty or undefined
            //   console.error('Error: Unexpected response structure');
            //   setResponseContent('Error occurred');
            // }
      //error handling
    } catch (error) {
      console.error('Error:', error)
      setResponseContent('Error occurred')
    } finally {
      setLoading(false)
    }
    //sets prompt state variable to an empty string
    setPrompt('')
  }
    //sets current prompt state to the new value entered by user
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