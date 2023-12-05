import { checkToken } from '../../utilities/users-service';
import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const HISTORY_API_URL = 'http://localhost:3000/api/openAi/history'

export default function PromptHistoryPage() {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    // Fetch saved prompts when the component mounts
    const fetchPrompts = async () => {
      try {
        const response = await axios.get(HISTORY_API_URL);
        console.log(response)
        setPrompts(response.data);
       setTimeout(() => {
        console.log('alex is awesome', prompts)
       }, 2000)

      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };

    fetchPrompts();
  }, []);

  console.log(prompts)
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }
  
  const getHistory = async () => {
    try {
      const response = await axios.get(HISTORY_API_URL);
      console.log(response)
      setPrompts(response.data);
     setTimeout(() => {
      console.log('alex is awesome', prompts)
     }, 2000)

    } catch (error) {
      console.error('Error fetching prompts:', error);
    }
  };


  return (
    <div>
      <Container>
      <Row>
        <Col>
          <Button onClick={getHistory}>
            get history</Button>
        </Col>
        <br />
        <br />
        <Col>
          <Button onClick={handleCheckToken}>Check Login</Button>
        </Col>
      </Row>
    </Container>
      <h1>Prompt History</h1>
      <ul>
        {prompts.map((prompt) => (
          <li key={prompt._id}>
            <strong>Prompt:</strong> {prompt.prompt}<br />
            <strong>Response:</strong> {prompt.response}<br />
            {/* emphasize */}
            <em>Timestamp: {new Date(prompt.timestamp).toLocaleString()}</em>
            <p>________________________</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

