import React, { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { Button } from 'react-bootstrap';

const SignUpForm = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  });

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password } = formData;
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp({ name, email, password });
      setUser(user);
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      setFormData({ ...formData, error: 'Sign Up Failed - Try Again' });
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
          <Button variant='dark' type="submit" disabled={disable}>SIGN UP</Button>
        </form>
      </div>
      <p className="error-message">&nbsp;{formData.error}</p>
    </div>
  );
};

export default SignUpForm;
