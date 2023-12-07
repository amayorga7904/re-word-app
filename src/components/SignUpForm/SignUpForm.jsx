import { signUp } from '../../utilities/users-service'
import { Button } from 'react-bootstrap'
import React, { useState } from 'react'

const signUpData = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  error: ''
}

const SignUpForm = ({ setUser }) => {
  const [formData, setFormData] = useState(signUpData)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      error: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { name, email, password } = formData
      const user = await signUp(formData)
      setUser(user)
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      setFormData({ ...formData, error: 'Sign Up Failed - Try Again' })
    }
  }
  const disable = formData.password !== formData.confirm

  return (
    <div>
      <div className='form-container'>
        <form 
          autoComplete='off' 
          onSubmit={handleSubmit}
        >
          <label>Name</label>
          <input 
            type='text' 
            name='name' 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <label>Email</label>
          <input 
            type='email' 
            name='email' 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <label>Password</label>
          <input 
            type='password' 
            name='password' 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          <label>Confirm</label>
          <input 
            type='password' 
            name='confirm' 
            value={formData.confirm} 
            onChange={handleChange} 
            required 
          />
          <Button 
            variant='dark' 
            type='submit' 
            disabled={disable}>
            SIGN UP
          </Button>
        </form>
      </div>
      <p className='error-message'>&nbsp;{formData.error}</p>
    </div>
  )
}

export default SignUpForm