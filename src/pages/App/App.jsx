import PromptHistoryPage from '../PromptHistoryPage/PromptHistoryPage';
import NewPromptPage from '../NewPromptPage/NewPromptPage';
import { getUser } from '../../utilities/users-service';
import CodeHistory from '../CodeHistory/CodeHistory';
import NewCodePage from '../NewCodePage/NewCodePage';
import NavBar from '../../components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [user, setUser] = useState(getUser());
  

  return (
    <main className="App">
      { user ?
          <>
            <h1 className='title'>WORD-IQ</h1>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/api/openAi" element={<NewPromptPage />} />
              <Route path="/api/openAi/history" element={<PromptHistoryPage />} />
              <Route path="/api/codes" element={<NewCodePage />} />
              <Route path="/api/codes/history" element={<CodeHistory />} />
              <Route path="/api/math" element={<NewCodePage />} />
              <Route path="/api/math/history" element={<CodeHistory />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App