import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Mock authentication - in a real app, this would call an API
    if (email === 'admin@example.com' && password === 'password') {
      navigate('/admin-home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        
        <button type="submit" className="login-button">Login</button>
      </form>
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        Back to Main
      </button>
    </div>
  );
};

export default AdminLogin; 