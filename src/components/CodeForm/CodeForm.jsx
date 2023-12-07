import { Button, Form } from 'react-bootstrap'

const CodeForm = ({ handleCode, handleSubmit, code }) => {
  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group
          className='mb-6'
          controlId='exampleForm.ControlTextarea1'
          value={code}
          onChange={handleCode}
        >
        <Form.Label>Enter Code Below</Form.Label>
        <Form.Control 
          className='text-area' 
          as='textarea' 
          rows={6} 
        />
        </Form.Group>
        <Button 
          variant='dark'
          type='submit'
        >
          Submit
        </Button>
        <br />
        <br />
    </Form>
  )
}

export default CodeForm