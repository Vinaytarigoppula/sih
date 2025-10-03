import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import axios from 'axios';

// Function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password.length<5 || password.length>15) {
      alert("password must be between 5 and 15 character")
      return;
    }
    if (username.length < 5 || username.length > 15) {
      alert('Username must be between 5 and 15 characters');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/register', { username, email, password });
      alert(response.data.message);
      navigate('/home');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.register}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.h1}>SIGN UP</h1>
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
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              required
            />
            <i className='bx bxs-envelope'></i>
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
          <div className={styles.box}>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm Password"
              required
            />
            <i className='bx bxs-lock'></i>
          </div>
          <button type="submit" className={styles.button}>SIGN UP</button>
          <div className={styles.login}>
            <p>Already have an account?
              <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
