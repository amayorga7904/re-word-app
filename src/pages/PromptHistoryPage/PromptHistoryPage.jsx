import { Container, CardGroup, Card, Row, Col } from "react-bootstrap";
import React, { useRef, useEffect, useState } from "react";
import { getToken } from '../../utilities/users-service';
import { getUser } from '../../utilities/users-service';
import Button from 'react-bootstrap/Button';
import './PromptHistoryPage.css'
import axios from "axios";

const HISTORY_API_URL = 'http://localhost:3000/api/openAi/history'
const MAX_POSSIBLE_HEIGHT = 10000;

const styles = {
  container: {
    width: 300,
    margin: "0 auto"
  },
  card: {
    backgroundColor: "#B7E0F2",
    borderRadius: 55,
    padding: "3rem"
  }
};

const ExpendableText = ({ maxHeight, children }) => {
  const ref = useRef();
  const [shouldShowExpand, setShouldShowExpand] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (ref.current.scrollHeight > maxHeight) {
      setShouldShowExpand(true);
      setExpanded(false);
    }
  }, [maxHeight]);

  return (
    <Card.Text as="h4" style={styles.cardText} ref={ref}>
      <div
        className="inner"
        style={{ maxHeight: expanded ? MAX_POSSIBLE_HEIGHT : maxHeight }}
      >
        {children}
      </div>
      {shouldShowExpand && (
        <Button variant='dark' onClick={() => setExpanded(!expanded)}>Expand</Button>
      )}
    </Card.Text>
  );
};
const PromptHistoryPage = () => {
  const [prompts, setPrompts] = useState([]);
  const [promptTitle, setPromptTitle] = useState('')

  useEffect(() => {
    // Fetch saved prompts when the component mounts
    const fetchPrompts = async () => {
      try {
        const response = await axios.get(HISTORY_API_URL);
        console.log('Response Data:', response.data);
        setPrompts(response.data);

      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };

    fetchPrompts();
  }, []);

  console.log(prompts)
  
  const getHistory = async () => {
    try {
        const currentUser = getUser();
        if (currentUser) {
            const token = await getToken()
            const response = await axios.get(`${HISTORY_API_URL}/${currentUser._id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setPrompts(response.data);
        } else {
            console.error('User not defined');
        }
    } catch (error) {
        console.error('Error fetching prompts:', error);
    }
};

const handlePromptTitleChange = (e) => {
  setPromptTitle(e.target.value.toUpperCase())
}

const updatePromptTitle = async (promptId) => {
  try {
  const currentUser = getUser()
  const token = await getToken()

  await axios.put(`${HISTORY_API_URL}/${currentUser._id}/${promptId}`, 
  { promptTitle }, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  setPromptTitle('')
  getHistory()
} catch (error) {
  console.error('Error updating prompt title:', error);
}
}

  return (
    <Container className='prompt-page'>
      <Row>
        <Col>
          <Button variant='dark' onClick={getHistory}>
            Get History</Button>
        </Col>
        <br />
        <br />
      </Row>
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
      <br />
      <br />
    </Container>
  );
}

export default PromptHistoryPage