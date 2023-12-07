import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { getToken } from '../../utilities/users-service';
import { getUser } from '../../utilities/users-service';
import './CodeHistory.css'
import axios from "axios";
import CodeCard from "../../components/CodeCard/CodeCard";

const CODE_HISTORY_API_URL = 'http://localhost:3000/api/codes/history'


const CodeHistory = () => {
    const [codes, setCodes] = useState([]);
    const [title, setTitle] = useState('')
  
    console.log(codes)

  const getCodeHistory = async () => {
    try {
      const currentCoder = getUser()
      if (currentCoder) {
        const codeToken = await getToken()
        const reply = await axios.get(`${CODE_HISTORY_API_URL}/${currentCoder._id}`,  {
          headers: {
            Authorization: `Bearer ${codeToken}`,
          }
        })
        setCodes(reply.data)
      } else {
        console.log('Coder not defined')
      }
    } catch (error) {
      console.log('Error fetching codes:', error)
    }
  }

  const updateCodeTitle = async (codeId) => {
    try {
      const currentCoder = getUser();
      const codeToken = await getToken();
      // Update the title for the specific code
      await axios.put(
        `${CODE_HISTORY_API_URL}/${currentCoder._id}/${codeId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${codeToken}`,
          },
        }
      );
      setTitle('')
      // Refresh the code history after updating the title
      getCodeHistory();
    } catch (error) {
      console.error('Error updating code title:', error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value.toUpperCase());
  };

  return (
    <Container className="code-history-page">
      <Row>
        <Col>
          <Button 
          variant='dark' 
          onClick={getCodeHistory}>
          Get History
          </Button>
        </Col>
        <br />
        <br />
      </Row>
      <CodeCard codes={codes} title={title} updateCodeTitle={updateCodeTitle} handleTitleChange={handleTitleChange} />
      <br />
      <br />
    </Container>
  );
}


export default CodeHistory