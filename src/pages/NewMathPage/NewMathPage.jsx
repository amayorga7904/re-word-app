import { Row, Col, Container } from 'react-bootstrap';
import { useMathOpenAI } from '../MathHistory/MathAIAPI'; 
import { getToken } from "../../utilities/users-service";
import MathHistory from '../MathHistory/MathHistory';
import React, { useState } from "react"
import axios from "axios"
import MathForm from '../../components/MathForm/MathForm';
import MathLoader from '../../components/MathLoader/MathLoader';


const MATH_BASE_URL = 'http://localhost:3000/api/math'

const NewMathPage = () => {
    const { addOutput } = useMathOpenAI()
    const [math, setMath] = useState('')
    const [outputContent, setOutputContent] = useState('')
    const [loadingSpot, setLoadingSpot] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoadingSpot(true);
      try {
        const mathToken = await getToken();
        const output = await axios.post(MATH_BASE_URL, { math }, {
          headers: {
            Authorization: `Bearer ${mathToken}`
          }
        });  

        console.log('API Response:', output);    

        if (output.data.message && output.data.message.content) {
          setOutputContent(output.data.message.content);
          addOutput(output.data.message.content);
        } else {
          console.error('Error: Unexpected output structure');
          setOutputContent('Error occurred');
        }
      } catch (error) {
        console.error('Error:', error)
        setOutputContent('Error occurred')
      } finally {
        setLoadingSpot(false)
      }

      setMath('')
    }

    const handleMath = (e) => {
      setMath(e.target.value)
      }

      return (
        <Container className="new-math-page">
            <Row>
              <Col sm={8}>
                <MathLoader loadingSpot={loadingSpot} outputContent={outputContent} />
              <MathForm handleMath={handleMath} handleSubmit={handleSubmit} math={math}/>
            </Col>
            <Col sm={true}>
              <MathHistory />
            </Col>
          </Row>
        </Container>
      )
    }
    
    export default NewMathPage