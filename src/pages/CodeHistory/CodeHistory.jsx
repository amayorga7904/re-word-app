import { Container, CardGroup, Card, Row, Col, Button } from "react-bootstrap";
import React, { useRef, useEffect, useState } from "react";
import { getToken } from '../../utilities/users-service';
import { getUser } from '../../utilities/users-service';
import { ExpendableText } from '../HistoryHelper'
import './CodeHistory.css'
import axios from "axios";

const CODE_HISTORY_API_URL = 'http://localhost:3000/api/codes/history'


const CodeHistory = () => {
    const [codes, setCodes] = useState([]);
    const [title, setTitle] = useState('')
  
    useEffect(() => {
      // Fetch saved codes when the component mounts
      const fetchCodes = async () => {
        try {
          const reply = await axios.get(CODE_HISTORY_API_URL);
          console.log(reply)
          setCodes(reply.data);
  
        } catch (error) {
          console.error('Error fetching codes:', error);
        }
      };
  
      fetchCodes();
    }, []);
  
    console.log(codes)

  const getCodeHistory = async () => {
    try {
      const currentCoder = getUser()
      if (currentCoder) {
        const codeToken = await getToken()
        const reply = await axios.get(`${CODE_HISTORY_API_URL}/${currentCoder._id}`,  {
          headers: {
            Authorization: `Bearer ${codeToken}`,
          }
        })
        setCodes(reply.data)
      } else {
        console.log('Coder not defined')
      }
    } catch (error) {
      console.log('Error fetching codes:', error)
    }
  }
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value.toUpperCase());
  };

  const updateCodeTitle = async (codeId) => {
    try {
      const currentCoder = getUser();
      const codeToken = await getToken();
      console.log('Updated Title:', title);
      // Update the title for the specific code
      await axios.put(
        `${CODE_HISTORY_API_URL}/${currentCoder._id}/${codeId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${codeToken}`,
          },
        }
      );
      setTitle('')
      // Refresh the code history after updating the title
      getCodeHistory();
    } catch (error) {
      console.error('Error updating code title:', error);
    }
  };


  return (
    <Container className="code-history-page">
      <Row>
        <Col>
          <Button variant='dark' onClick={getCodeHistory}>
            Get History</Button>
        </Col>
        <br />
        <br />
      </Row>
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
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Change Title"
                            />
                            <Button variant='dark' onClick={() => updateCodeTitle(code._id)}>Save</Button>
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
                        {/* emphasize */}
                        <em>Timestamp: {new Date(code.timestamp).toLocaleString()}</em>
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
      <br />
      <br />
    </Container>
  );
}


export default CodeHistory