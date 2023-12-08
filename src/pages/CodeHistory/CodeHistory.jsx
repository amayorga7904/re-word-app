import { getToken, getUser } from '../../utilities/users-service'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CodeCard from '../../components/CodeCard/CodeCard'
import React, { useState } from "react"
import './CodeHistory.css'
import axios from 'axios'

const CODE_HISTORY_API_URL = '/api/codes/history'

const CodeHistory = () => {
  // State to manage the list of codes and the title for updating
  const [codes, setCodes] = useState([])
  const [title, setTitle] = useState('')

  // Function to fetch code history from the server
  const getCodeHistory = async () => {
    try {
      const currentCoder = getUser()
      if (currentCoder) {
        const codeToken = getToken()
        const reply = await axios.get(`${CODE_HISTORY_API_URL}/${currentCoder._id}`, {
          headers: {
            Authorization: `Bearer ${codeToken}`,
          },
        })
        setCodes(reply.data)
      }
    } catch (error) {
      console.log('Error fetching codes:', error)
    }
  }

  // Function to update the title of a code entry
  const updateCodeTitle = async (codeId) => {
    try {
      const currentCoder = getUser()
      const codeToken = getToken()

      await axios.put(
        `${CODE_HISTORY_API_URL}/${currentCoder._id}/${codeId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${codeToken}`,
          },
        }
      )
      setTitle('')
      getCodeHistory()
    } catch (error) {
      console.error('Error updating code title:', error)
    }
  }

  // Event handler for title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value.toUpperCase())
  }

  return (
    <Container className="code-history-page">
      <Row>
        <Col>
          <Button
            variant='dark'
            onClick={getCodeHistory}
          >
            Get History
          </Button>
        </Col>
        <br />
        <br />
      </Row>
      <CodeCard
        codes={codes}
        title={title}
        updateCodeTitle={updateCodeTitle}
        handleTitleChange={handleTitleChange}
        getCodeHistory={getCodeHistory}
      />
      <br />
      <br />
    </Container>
  )
}

export default CodeHistory
