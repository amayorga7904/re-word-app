import { Row, Col, Container } from 'react-bootstrap';
import { useCodeOpenAI } from "../CodeHistory/CodeAIAPI" 
import { getToken } from "../../utilities/users-service";
import CodeHistory from "../CodeHistory/CodeHistory"
import React, { useState } from "react"
import './NewCodePage.css'
import axios from "axios"
import CodeLoader from '../../components/CodeLoader/CodeLoader';
import CodeForm from '../../components/CodeForm/CodeForm';


const CODE_BASE_URL = 'http://localhost:3000/api/codes'

const NewCodePage = () => {
    const { addReply } = useCodeOpenAI()
    //used to update the value of code
    const [code, setCode] = useState('')
    //updates stateContent based on reply recieved from backend
    const [explanationContent, setExplanationContent] = useState('')
    const [loadingArea, setLoadingArea] = useState(false);
    //prevents page from refreshing
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoadingArea(true);
      try {
        const codeToken = await getToken();
        //async POST request to endpoint with prompt sent to req.body
        const reply = await axios.post(CODE_BASE_URL, { code }, {
          headers: {
            Authorization: `Bearer ${codeToken}`
          }
        });  
        //async POST request to endpoint with code sent to req.body  
        console.log('API Response:', reply);    
        //explanationContent is set to the first value of the API reply
        if (reply.data.message && reply.data.message.content) {
          setExplanationContent(reply.data.message.content);
          addReply(reply.data.message.content);
  
        } else {
          console.error('Error: Unexpected reply structure');
          setExplanationContent('Error occurred');
        }

        //error handling
      } catch (error) {
        console.error('Error:', error)
        setExplanationContent('Error occurred')
      } finally {
        setLoadingArea(false)
      }
      //sets code state variable to an empty string
      setCode('')
    }
      //sets current code state to the new value entered by user
      const handleCode = (e) => {
        setCode(e.target.value)
      }

      return (
        <Container className="new-code-page">
            <Row>
              <Col sm={8}>
                <CodeLoader loadingArea={loadingArea} explanationContent={explanationContent} />
              <CodeForm handleCode={handleCode} handleSubmit={handleSubmit} code={code} />
            </Col>
            <Col sm={true}>
              <CodeHistory />
            </Col>
          </Row>
        </Container>
      )
    }
    
    export default NewCodePage