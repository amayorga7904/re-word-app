// Import necessary functions and components from external libraries and files
import { getToken, getUser } from '../../utilities/users-service'
import { Container, Row, Col, Button } from 'react-bootstrap'
import MathCard from '../../components/MathCard/MathCard'
import React, { useState } from 'react'
import axios from 'axios'

// Define the API endpoint for math history
const MATH_HISTORY_API_URL = '/api/math/history'


const MathHistory = () => {
  // State to manage the list of math equations and the title for updating
  const [maths, setMaths] = useState([])
  const [mathTitle, setMathTitle] = useState('')

  // Function to fetch math history from the server
  const getMathHistory = async () => {
    try {
      const currentMather = getUser()
      if (currentMather) {
        const mathToken = getToken()
        const output = await axios.get(`${MATH_HISTORY_API_URL}/${currentMather._id}`, {
          headers: {
            Authorization: `Bearer ${mathToken}`,
          },
        })
        setMaths(output.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Event handler for mathTitle input change
  const handleMathTitleChange = (e) => {
    setMathTitle(e.target.value.toUpperCase())
  }

  // Function to update the title of a math entry
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
      console.error('Error updating math title:', error)
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
        getMathHistory={getMathHistory}
      />
      <br />
      <br />
    </Container>
  )
}

export default MathHistory
