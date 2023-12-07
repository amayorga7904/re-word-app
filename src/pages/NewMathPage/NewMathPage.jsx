import { Button, Spinner, Form, Row, Col, Container } from 'react-bootstrap';
import { useMathOpenAI } from '../MathHistory/MathAIAPI'; 
import { getToken } from "../../utilities/users-service";
import MathHistory from '../MathHistory/MathHistory';
import React, { useState } from "react"
import axios from "axios"


const MATH_BASE_URL = 'http://localhost:3000/api/math'

const NewMathPage = () => {
    const { addOutput } = useMathOpenAI()
    //used to update the value of math
    const [math, setMath] = useState('')
    //updates stateContent based on output recieved from backend
    const [outputContent, setOutputContent] = useState('')
    const [loadingSpot, setLoadingSpot] = useState(false);
    //prevents page from refreshing
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoadingSpot(true);
      try {
        const mathToken = await getToken();
        //async POST request to endpoint with prompt sent to req.body
        const output = await axios.post(MATH_BASE_URL, { math }, {
          headers: {
            Authorization: `Bearer ${mathToken}`
          }
        });  
        //async POST request to endpoint with math sent to req.body  
        console.log('API Response:', output);    
        //outputContent is set to the first value of the API output
        if (output.data.message && output.data.message.content) {
          setOutputContent(output.data.message.content);
          addOutput(output.data.message.content);
  
        } else {
          console.error('Error: Unexpected output structure');
          setOutputContent('Error occurred');
        }

        //error handling
      } catch (error) {
        console.error('Error:', error)
        setOutputContent('Error occurred')
      } finally {
        setLoadingSpot(false)
      }
      //sets math state variable to an empty string
      setMath('')
    }
      //sets current math state to the new value entered by user
      const handleMath = (e) => {
        setMath(e.target.value)
      }

      return (
        <Container className="new-math-page">
            <Row>
              <Col sm={8}>
                <div>
                  <h3>Explain Math like a Boss!</h3>
                  <h6>Ask me How!</h6>
                  <br />
                  {/* if truthy, displays value. Else displays... */}
                  <p>{loadingSpot ? <Spinner animation="grow" /> : outputContent || 'ᕙ(▀̿̿Ĺ̯̿̿▀̿ ̿) ᕗ'}</p>
                </div>
              {/* invokes handleSumbit function */}
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-6"
                  controlId="exampleForm.ControlTextarea1"
                  //sets math state variable
                  value={math}
                  onChange={handleMath}>
                  <Form.Label>Enter Math Equation Below</Form.Label>
                  <Form.Control className='text-area' as="textarea" rows={6} />
                </Form.Group>
                  <Button variant="dark"
                  type="submit">Submit</Button>
                <br />
                <br />
              </Form>
            </Col>
            <Col sm={true}>
              <MathHistory />
            </Col>
          </Row>
        </Container>
      )
    }
    
    export default NewMathPage