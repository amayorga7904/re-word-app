import React, { useState } from "react"
import axios from "axios"
import { useOpenAI } from "../PromptHistoryPage/OpenAIAPI"

//endpoint for OpenAI API chat completions
// const BASE_URL = 'https://api.openai.com/v1/chat/completions'
const BASE_URL = '/api/openAi'


export default function NewPromptPage() {
  const { addResponse } = useOpenAI();
  //used to update the value of prompt
  const [prompt, setPrompt] = useState('')
  //updates stateContent based on response recieved from backend
  const [responseContent, setResponseContent] = useState('')
  const [loading, setLoading] = useState(false);
  //prevents page from refreshing
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    
  
    try {
      //async POST request to endpoint with prompt sent to req.body
      const response = await axios.post(BASE_URL, { prompt });  
      console.log('API Response:', response);    
      //responseContent is set to the first value of the API response
      if (response.data.message && response.data.message.content) {
        setResponseContent(response.data.message.content);
        addResponse(response.data.message.content);

      } else {
        console.error('Error: Unexpected response structure');
        setResponseContent('Error occurred');
      }
            // if (response.data.choices && response.data.choices.length > 0) {
            //   setResponseContent(response.data.choices[0].message.content);
            // } else {
            //   // Handle the case when choices array is empty or undefined
            //   console.error('Error: Unexpected response structure');
            //   setResponseContent('Error occurred');
            // }
      //error handling
    } catch (error) {
      console.error('Error:', error)
      setResponseContent('Error occurred')
    } finally {
      setLoading(false)
    }
    //sets prompt state variable to an empty string
    setPrompt('')
  }
    //sets current prompt state to the new value entered by user
    const handlePrompt = (e) => {
      setPrompt(e.target.value)
    }

  return (
    <div>
        <div>
          <h3>Sound Smarter with the Click of a Button</h3>
          {/* if truthy, displays value. Else displays... */}
          <p>{loading ? 'Hmm let me think...' : responseContent || 'Let\'s Rephrase!'}</p>
        </div>
      {/* invokes handleSumbit function */}
      <form onSubmit={handleSubmit}>
        <input
          className='text-area'
          type="text"
          placeholder='Enter Text You Wish to Improve'
          //sets prompt state variable
          value={prompt}
          onChange={handlePrompt}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
