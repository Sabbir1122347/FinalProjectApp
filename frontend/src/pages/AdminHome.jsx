import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin-home');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err);
    }
  };

  const handleRegister = async () => {
    setError('');

    if (!registerEmail || !registerPassword) {
      setError('Please fill in both fields');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      alert('Admin account created successfully!');
      setShowPopup(false);
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (err) {
      setError('Failed to create account. Try a different email.');
      console.error(err);
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setRegisterEmail('');
    setRegisterPassword('');
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <form className="admin-login-form" onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your admin email"
            required
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
            required
          />
        </div>

        <button type="submit" className="login-button">Login</button>

        <button 
          type="button" 
          className="register-button"
          onClick={openPopup}
        >
          Create Admin Account
        </button>
      </form>

      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        Back to Main
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Create Admin Account</h2>

            <input
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              placeholder="Enter new admin email"
              className="popup-input"
            />
            <input
              type="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              placeholder="Enter new password"
              className="popup-input"
            />

            <div className="popup-buttons">
              <button onClick={handleRegister} className="popup-button register">
                Register
              </button>
              <button onClick={closePopup} className="popup-button cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;


