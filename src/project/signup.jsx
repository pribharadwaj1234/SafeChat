import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';  // Import CSS for styling

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return;
    }

    if (username.trim() && password.trim()) {
      try {
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          navigate(`/login21`);
        } else {
          const errorText = await response.text();
          alert(`Failed to create user: ${errorText}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error creating user');
      }
    } else {
      alert("Please fill in all the fields");
    }
  };

  const validatePassword = (password) => {
    const passwordCriteria = [
      { regex: /.{8,}/, message: "Password must be at least 8 characters long" },
      { regex: /[A-Z]/, message: "Password must contain at least one uppercase letter" },
      { regex: /[a-z]/, message: "Password must contain at least one lowercase letter" },
      { regex: /\d/, message: "Password must contain at least one number" },
      { regex: /[@$!%*?&#]/, message: "Password must contain at least one special character" },
    ];

    for (const criterion of passwordCriteria) {
      if (!criterion.regex.test(password)) {
        setPasswordError(criterion.message);
        return false;
      }
    }

    setPasswordError('');
    return true;
  };

  return (
    <div className="signup-page">
      <aside className="signup-aside">
       {/*} <h5>Sign up to access exclusive features!</h5>*/}
        
        <img src="/images/talking.png" alt="Signup Image" style={{ width: '70%', height: 'auto' }} /><br></br><br></br><br></br>
        <p><b>Your Safe Space Is A Free Chat Room Website Where You Can Have Live Chat With Anyone You Want, You Can Discuss With People From India, USA, Canada, Mexico, England And People From All Over The World. Any Time You Can Start A Private Conversation Without Being Concerned About Your Privacy.</b></p>
      </aside>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h5 className="text-center">Create Your Account</h5>
          <input
            type="text"
            placeholder="Create a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
          {passwordError && <p className="password-error">{passwordError}</p>}
          <button type="submit" className="signup-button">Continue</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div>
          <h5>Popular Websites</h5>
          <ul className="footer-list">
            <li><a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Google</a></li>
            <li><a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer">Microsoft</a></li>
            <li><a href="https://workspace.google.com" target="_blank" rel="noopener noreferrer">Google Workspace</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
