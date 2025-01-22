import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      // Log the status code and headers for debugging
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
  
      // Check if the response is OK (status code 2xx)
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Failed to login';
  
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          errorMessage = result.message || errorMessage;
        } else {
          const errorText = await response.text();
          console.log('Error Response (Text):', errorText); // Log the actual text response
          errorMessage = errorText || errorMessage;
        }
  
        throw new Error(errorMessage);
      }
  
      const result = await response.json();
      alert(result.message);
      navigate('/home'); // Navigate to home on successful login
  
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login: ' + error.message);
    }
  };
    return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.h1}>LOGIN</h1>
          <div className={styles.box}>
            <input
              className={styles.username}
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              required
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className={styles.box}>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />
            <i className='bx bxs-lock'></i>
          </div>
          <div className={styles.save}>
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <button type="button" className={styles.forgotPasswordButton} onClick={() => {/* Handle forgot password */}}>
              Forgot password?
            </button>
          </div>
          <button type="submit" className={styles.button}>Login</button>
          <div className={styles.register}>
            <p>Don't have an account? 
              <Link to="/register">SIGN UP</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
