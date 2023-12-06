import React, { useState } from "react"
import axios from "axios"
import { useCodeOpenAI } from "../CodeHistory/CodeAIAPI" 
import CodeHistory from "../CodeHistory/CodeHistory"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Spinner } from 'react-bootstrap';
import { getToken } from "../../utilities/users-service";
import Form from 'react-bootstrap/Form';
import './NewCodePage.css'


const CODE_BASE_URL = 'http://localhost:3000/api/codes'

export default function NewCodePage() {
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
              // if (reply.data.choices && reply.data.choices.length > 0) {
              //   setExplanationContent(reply.data.choices[0].message.content);
              // } else {
              //   // Handle the case when choices array is empty or undefined
              //   console.error('Error: Unexpected reply structure');
              //   setExplanationContent('Error occurred');
              // }
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
                <div>
                  <h3>Explain Code like a Pro!</h3>
                  <h6>Ask me How!</h6>
                  <br />
                  {/* if truthy, displays value. Else displays... */}
                  <p>{loadingArea ? <Spinner animation="grow" /> : explanationContent || 'ᕙ(▀̿̿Ĺ̯̿̿▀̿ ̿) ᕗ'}</p>
                </div>
              {/* invokes handleSumbit function */}
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-6"
                  controlId="exampleForm.ControlTextarea1"
                  //sets code state variable
                  value={code}
                  onChange={handleCode}>
                  <Form.Label>Enter Code Below</Form.Label>
                  <Form.Control className='text-area' as="textarea" rows={6} />
                </Form.Group>
                  <Button variant="dark"
                  type="submit">Submit</Button>
                <br />
                <br />
              </Form>
            </Col>
            <Col sm={true}>
              <CodeHistory />
            </Col>
          </Row>
        </Container>
      )
    }
    