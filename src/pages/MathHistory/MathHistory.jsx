import { Container, CardGroup, Card, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getToken } from '../../utilities/users-service';
import { getUser } from '../../utilities/users-service';
import { ExpendableText } from '../HistoryHelper'
import axios from "axios";

const MATH_HISTORY_API_URL = 'http://localhost:3000/api/math/history'


const MathHistory = () => {
    const [maths, setMaths] = useState([]);
    const [mathTitle, setMathTitle] = useState('')
  
    useEffect(() => {
      // Fetch saved maths when the component mounts
      const fetchMathEquations = async () => {
        try {
          const output = await axios.get(MATH_HISTORY_API_URL);
          console.log(output)
          setMaths(output.data);
  
        } catch (error) {
          console.error('Error fetching maths:', error);
        }
      };
  
      fetchMathEquations();
    }, []);
  
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
    setMathTitle(e.target.value.toUpperCase());
  };

  const updateMathTitle = async (mathId) => {
    try {
      const currentMather = getUser();
      const mathToken = await getToken();
      console.log('Updated Title:', mathTitle);
      // Update the mathTitle for the specific math
      await axios.put(
        `${MATH_HISTORY_API_URL}/${currentMather._id}/${mathId}`,
        { mathTitle },
        {
          headers: {
            Authorization: `Bearer ${mathToken}`,
          },
        }
      );
      setMathTitle('')
      // Refresh the math history after updating the mathTitle
      getMathHistory();
    } catch (error) {
      console.error('Error updating math mathTitle:', error);
    }
  };


  return (
    <Container className="math-history-page">
      <Row>
        <Col>
          <Button variant='dark' onClick={getMathHistory}>
            Get History</Button>
        </Col>
        <br />
        <br />
      </Row>
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
                            type="text"
                            value={mathTitle}
                            onChange={handleMathTitleChange}
                            placeholder="Change Title"
                            />
                            <Button variant='dark' onClick={() => updateMathTitle(math._id)}>Save</Button>
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
                        {/* emphasize */}
                        <em>Timestamp: {new Date(math.timestamp).toLocaleString()}</em>
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
      <br />
      <br />
    </Container>
  );
}


export default MathHistory