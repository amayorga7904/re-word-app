import { Button, Form } from 'react-bootstrap'

// PromptForm component for handling user input to create a new prompt
const PromptForm = ({ handlePrompt, handleSubmit, prompt }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group
        className='mb-6'
        controlId='exampleForm.ControlTextarea1'
        value={prompt}
        onChange={handlePrompt}
      >
        <Form.Label>Enter Text You Wish to Rephrase</Form.Label>
        <Form.Control 
          className='text-area' 
          as="textarea" 
          rows={6} 
        />
      </Form.Group>
      <Button 
        variant='dark'
        type='submit'>
        Submit
      </Button>
      <br />
      <br />
    </Form>
  )
}

export default PromptForm
