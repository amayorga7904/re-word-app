import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

const AuthPage = ({ setUser }) => {
  const [showSignUp, setShowSignUp] = useState(false)
  return (
    <main>
      <h1>WORD-IQ</h1>
      <Button variant='dark' onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Log In' : 'Sign Up'}</Button>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
    </main>
  )
}

export default AuthPage