import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { getUser } from '../../utilities/users-service';
import { getToken } from '../../utilities/users-service';
import { Container, CardGroup, Card, Row, Col, Button } from "react-bootstrap";
import './CodeHistory.css'
const CODE_HISTORY_API_URL = 'http://localhost:3000/api/codes/history'
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

export default function CodeHistory() {
    const [codes, setCodes] = useState([]);
  
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
                          <h3>Your Title</h3>
                        </Card.Title>
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
