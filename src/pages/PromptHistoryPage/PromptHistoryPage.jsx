import { checkToken } from '../../utilities/users-service';
import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';

const HISTORY_API_URL = '/api/openAi/history'

export default function PromptHistoryPage() {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    // Fetch saved prompts when the component mounts
    const fetchPrompts = async () => {
      try {
        const response = await axios.get(HISTORY_API_URL);
        setPrompts(response.data);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };

    fetchPrompts();
  }, []);

  
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }
  
  return (
    <div>
      <h1>PromptHistoryPage</h1>
      <ul>
        {prompts.map((prompt) => (
          <li key={prompt._id}>
            <strong>Prompt:</strong> {prompt.prompt}<br />
            <strong>Response:</strong> {prompt.response}<br />
            {/* emphasize */}
            <em>Timestamp: {new Date(prompt.timestamp).toLocaleString()}</em>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </div>
  );
}

