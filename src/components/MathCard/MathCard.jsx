import { CardGroup, Card, Row, Col, Button } from 'react-bootstrap'
import { getUser, getToken } from '../../utilities/users-service'
import { ExpendableText } from '../../pages/HistoryHelper'
import axios from 'axios'

// API endpoint for math history
const MATH_HISTORY_API_URL = '/api/math/history'

// MathCard component for displaying and managing math history
const MathCard = ({ maths, mathTitle, handleMathTitleChange, updateMathTitle, getMathHistory }) => {

  // Handle the deletion of a math entry
  const handleDelete = async (mathId) => {
    try {
      // Get current user and token
      const currentMather = getUser()
      const mathToken = getToken()
      
      // Send a delete request to the server
      await axios.delete(`${MATH_HISTORY_API_URL}/${currentMather._id}/${mathId}`, {
        headers: {
          Authorization: `Bearer ${mathToken}`,
        },
      })

      // Refresh the math history after deletion
      getMathHistory()
    } catch (error) {
      console.error('Error deleting math:', error)
    }
  }

  return (
    <CardGroup>
      <Card>
        <Row>
          <Col>
            <h1>Math History</h1>
            {Array.isArray(maths) && maths.length > 0 ? (
              <ul>
                {maths.map((math) => (
                  <Card.Body key={math._id}>
                    <li>
                      <Card.Title>
                        <h3>
                          <input
                            type='text'
                            value={mathTitle}
                            onChange={handleMathTitleChange}
                            placeholder='Change Title'
                          />
                          <Button 
                            variant='dark' 
                            onClick={() => updateMathTitle(math._id)}
                          >
                            Save
                          </Button>
                        </h3>
                      </Card.Title>
                      <br />
                      <strong>{math.title}</strong>
                      <br />
                      <br />
                      <ExpendableText maxHeight={95}>
                        <strong>Equation:</strong> {math.math}<br />
                      </ExpendableText>
                      <ExpendableText maxHeight={95}>
                        <strong>Explanation:</strong> {math.output}<br />
                      </ExpendableText>
                      <em>Date: {new Date(math.timestamp).toLocaleString()}</em>
                      <br />
                      <Button
                        variant='dark'
                        onClick={() => handleDelete(math._id)}
                      >
                        Delete
                      </Button>
                      <p>________________________</p>
                    </li>
                  </Card.Body>
                ))}
              </ul>
            ) : (
              <p>Your Math Equations will be Seen Here</p>
            )}
          </Col>
        </Row>
      </Card>
    </CardGroup>
  )
}

export default MathCard
