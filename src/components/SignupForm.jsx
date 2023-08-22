import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const SignUpForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username,
            password,
          },
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        localStorage.setItem('auth-token', result.data.token)
        navigate('/dashboard')
      } else {
        
        setErrorMessage(result.error.message)
      }
    } catch (error) {
      setErrorMessage('There was an error registering your account');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  )
}

export default SignUpForm
