import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewPromptPage from '../NewPromptPage/NewPromptPage';
import PromptHistoryPage from '../PromptHistoryPage/PromptHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import CodeHistory from '../CodeHistory/CodeHistory';
import NewCodePage from '../NewCodePage/NewCodePage';

export default function App() {
  const [user, setUser] = useState(getUser());
  

  return (
    <main className="App">
      { user ?
          <>
            <h1>WORD-IQ</h1>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/api/openAi" element={<NewPromptPage />} />
              <Route path="/api/openAi/history" element={<PromptHistoryPage />} />
              <Route path="/api/codes" element={<NewCodePage />} />
              <Route path="/api/codes/history" element={<CodeHistory />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
