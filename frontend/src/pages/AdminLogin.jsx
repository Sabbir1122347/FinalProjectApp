import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Admin account created successfully! You can now log in.');
      setIsRegistering(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Failed to create account. Email might already be used.');
      console.error(err);
    }
  };

  return (
    <div className="admin-login-container">
      <h1>Admin {isRegistering ? 'Register' : 'Login'}</h1>

      {error && <div className="error-message">{error}</div>}

      {!isRegistering ? (
        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="login-button">Login</button>
            <button
              type="button"
              className="register-button"
              onClick={() => setIsRegistering(true)}
            >
              Create Account
            </button>
          </div>
        </form>
      ) : (
        <form className="admin-login-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter new admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="create-button">Create</button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsRegistering(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <button className="back-button" onClick={() => navigate('/')}>
        Back to Main
      </button>
    </div>
  );
};

export default AdminLogin;
