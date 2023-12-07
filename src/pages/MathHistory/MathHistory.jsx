import { Container, Row, Col, Button } from 'react-bootstrap'
import MathCard from '../../components/MathCard/MathCard'
import { getToken } from '../../utilities/users-service'
import { getUser } from '../../utilities/users-service'
import React, { useState } from 'react'
import axios from 'axios'


const MATH_HISTORY_API_URL = 'http://localhost:3000/api/math/history'

const MathHistory = () => {
  const [maths, setMaths] = useState([])
  const [mathTitle, setMathTitle] = useState('')
  
  console.log('fight night at my place', maths)

  const getMathHistory = async () => {
    try {
      const currentMather = getUser()
      if (currentMather) {
        const mathToken = await getToken()
        const output = await axios.get(`${MATH_HISTORY_API_URL}/${currentMather._id}`,  {
          headers: {
            Authorization: `Bearer ${mathToken}`,
          }
        })
        setMaths(output.data)
      } else {
        console.log('Mather not defined')
      }
    } catch (error) {
      console.log('Error fetching maths:', error)
    }
  }
  
  const handleMathTitleChange = (e) => {
    setMathTitle(e.target.value.toUpperCase())
  }

  const updateMathTitle = async (mathId) => {
    try {
      const currentMather = getUser()
      const mathToken = await getToken()

      await axios.put(
        `${MATH_HISTORY_API_URL}/${currentMather._id}/${mathId}`,
        { mathTitle },
        {
          headers: {
            Authorization: `Bearer ${mathToken}`,
          },
        }
      )
      setMathTitle('')
      getMathHistory()
    } catch (error) {
      console.error('Error updating math mathTitle:', error)
    }
  }

  return (
    <Container className='math-history-page'>
      <Row>
        <Col>
          <Button 
            variant='dark' 
            onClick={getMathHistory}
          >
            Get History
          </Button>
        </Col>
        <br />
        <br />
      </Row>
      <MathCard 
        maths={maths} 
        mathTitle={mathTitle} 
        handleMathTitleChange={handleMathTitleChange} 
        updateMathTitle={updateMathTitle} 
      />
      <br />
      <br />
    </Container>
  )
}


export default MathHistory