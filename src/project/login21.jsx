import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';  // Ensure the CSS file contains styles for both forms

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
//logout option and storing the data on session storage
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          onLogin(username, password);
          navigate('/createroomform');  // Navigate to CreateRoomForm
        } else {
          alert('Invalid username or password');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error logging in');
      }
    } else {
      alert("Please fill in all the fields");
    }
  };

  return (
    <div className="signup-page">
      <aside className="signup-aside">
      
        
        <img src="/images/talking.png" alt="Signup Image" style={{ width: '70%', height: 'auto' }} /><br></br><br></br><br></br>
        <p><b>Your Safe Space Is A Free Chat Room Website Where You Can Have Live Chat With Anyone You Want, You Can Discuss With People From India, USA, Canada, Mexico, England And People From All Over The World. Any Time You Can Start A Private Conversation Without Being Concerned About Your Privacy.</b></p>
      </aside>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h5 className="text-center">Login to Your Account</h5>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
          <button
            type="submit"
            className="signup-button"
          >
            Login
          </button>
        </form>
      </div>
      
      <footer className="footer">
        <div>
          <h5>Popular Websites</h5>
          <ul className="footer-list">
            <li key="google"><a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Google</a></li>
            <li key="microsoft"><a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer">Microsoft</a></li>
            <li key="google-workspace"><a href="https://workspace.google.com" target="_blank" rel="noopener noreferrer">Google Workspace</a></li>
            <li key="twitter"><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default LoginForm;