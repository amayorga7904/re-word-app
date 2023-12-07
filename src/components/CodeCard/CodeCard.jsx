import { CardGroup, Card, Row, Col, Button } from 'react-bootstrap'
import { ExpendableText } from '../../pages/HistoryHelper'

const CodeCard = ({ codes, title, updateCodeTitle, handleTitleChange }) => {

  return (
  <CardGroup>
    <Card>
      <Row>
        <Col>
          <h1>Code History</h1>
          {Array.isArray(codes) && codes.length > 0 ? (
            <ul>
              {codes.map((code) => (
                <Card.Body key={code._id}>
                  <li>
                    <Card.Title>
                      <h3>
                        <input
                          type='text'
                          value={title}
                          onChange={handleTitleChange}
                          placeholder='Change Title'
                        />
                        <Button 
                          variant='dark' 
                          onClick={() => updateCodeTitle(code._id)}
                        >
                          Save
                        </Button>
                      </h3>
                    </Card.Title>
                    <br />
                    <strong>{code.title}</strong>
                    <br />
                    <br />
                    <ExpendableText maxHeight={95}>
                      <strong>Code:</strong> {code.code}<br />
                    </ExpendableText>
                    <ExpendableText maxHeight={95}>
                      <strong>Explanation:</strong> {code.reply}<br />
                    </ExpendableText>
                    <em>Date: {new Date(code.timestamp).toLocaleString()}</em>
                    <p>________________________</p>
                  </li>
                </Card.Body>
              ))}
            </ul>
          ) : (
            <p>Your Code will be Seen Here</p>
          )}
        </Col>
      </Row>
    </Card>
  </CardGroup>
  )
}

export default CodeCard