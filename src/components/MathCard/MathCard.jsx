import { CardGroup, Card, Row, Col, Button } from 'react-bootstrap'
import { ExpendableText } from '../../pages/HistoryHelper'

export default function MathCard({ maths, mathTitle, handleMathTitleChange, updateMathTitle }) {
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
