import CodeLoader from '../../components/CodeLoader/CodeLoader'
import CodeForm from '../../components/CodeForm/CodeForm'
import { useCodeOpenAI } from '../CodeHistory/CodeAIAPI' 
import { getToken } from '../../utilities/users-service'
import { Row, Col, Container } from 'react-bootstrap'
import CodeHistory from '../CodeHistory/CodeHistory'
import React, { useState } from 'react'
import './NewCodePage.css'
import axios from 'axios'


const CODE_BASE_URL = '/api/codes'

const NewCodePage = () => {
    const { addReply } = useCodeOpenAI()
    const [code, setCode] = useState('')
    const [explanationContent, setExplanationContent] = useState('')
    const [loadingArea, setLoadingArea] = useState(false)
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoadingArea(true)
      try {
        const codeToken = await getToken()
        const reply = await axios.post(CODE_BASE_URL, { code }, {
          headers: {
            Authorization: `Bearer ${codeToken}`
          }
        })
        if (reply.data.message && reply.data.message.content) {
          setExplanationContent(reply.data.message.content)
          addReply(reply.data.message.content)
        } else {
          console.error('Error: Unexpected reply structure')
          setExplanationContent('Error occurred')
        }
      } catch (error) {
        console.error('Error:', error)
        setExplanationContent('Error occurred')
      } finally {
        setLoadingArea(false)
      }
      setCode('')
    }

      const handleCode = (e) => {
        setCode(e.target.value)
      }

      return (
        <Container className='new-code-page'>
            <Row>
              <Col sm={8}>
                <CodeLoader 
                  loadingArea={loadingArea} 
                  explanationContent={explanationContent} 
                />
              <CodeForm 
                handleCode={handleCode} 
                handleSubmit={handleSubmit} 
                code={code} 
              />
            </Col>
            <Col sm={true}>
              <CodeHistory />
            </Col>
          </Row>
        </Container>
      )
    }
    
    export default NewCodePage