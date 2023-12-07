import { Button, Form } from 'react-bootstrap'

export default function MathForm({ handleMath, handleSubmit, math}) {
    
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group
        className='mb-6'
        controlId='exampleForm.ControlTextarea1'
        value={math}
        onChange={handleMath}
      >
        <Form.Label>Enter Math Equation Below</Form.Label>
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
