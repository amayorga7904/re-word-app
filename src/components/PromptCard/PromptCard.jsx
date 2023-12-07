import { CardGroup, Card, Row, Col, Button } from "react-bootstrap";
import { ExpendableText } from "../../pages/HistoryHelper";

export default function PromptCard({ prompts, promptTitle, handlePromptTitleChange, updatePromptTitle }) {
  return (
  <CardGroup>
    <Card>
      <Row>
        <Col>
          <h1>Prompt History</h1>
          {Array.isArray(prompts) && prompts.length > 0 ? (
            <ul>
              {prompts.map((prompt) => (
                <Card.Body key={prompt._id}>
                  <li>
                    <Card.Title>
                    <h3>
                        <input
                        type="text"
                        value={promptTitle}
                        onChange={handlePromptTitleChange}
                        placeholder="Change Title"
                        />
                        <Button variant='dark' onClick={() => updatePromptTitle(prompt._id)}>Save</Button>
                      </h3>
                    </Card.Title>
                    <br />
                    <strong>{prompt.title}</strong>
                    <br />
                    <br />
                    <ExpendableText maxHeight={95}>
                      <strong>Prompt:</strong> {prompt.prompt}<br />
                    </ExpendableText>
                    <ExpendableText maxHeight={95}>
                      <strong>Response:</strong> {prompt.response}<br />
                    </ExpendableText>
                    {/* emphasize */}
                    <em>Timestamp: {new Date(prompt.timestamp).toLocaleString()}</em>
                    <p>________________________</p>
                  </li>
                </Card.Body>
              ))}
            </ul>
          ) : (
            <p>Your Prompts will be Seen Here</p>
          )}
        </Col>
      </Row>
    </Card>
  </CardGroup>
  )
}
