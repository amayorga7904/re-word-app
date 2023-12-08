import { OpenAIProvider } from './pages/PromptHistoryPage/OpenAIAPI' 
import { CodeOpenAIProvider } from './pages/CodeHistory/CodeAIAPI'
import { MathOpenAIProvider } from './pages/MathHistory/MathAIAPI'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'
import App from './pages/App/App'
import React from 'react'
import 'typeface-roboto'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <MathOpenAIProvider>
        <CodeOpenAIProvider>
          <OpenAIProvider>
            <App />
          </OpenAIProvider>
        </CodeOpenAIProvider>
      </MathOpenAIProvider>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
