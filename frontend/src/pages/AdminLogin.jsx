import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState(''); // save email
  const [password, setPassword] = useState(''); // save password
  const [adminCode, setAdminCode] = useState(''); // save admin code
  const [error, setError] = useState(''); // save error message
  const [isRegistering, setIsRegistering] = useState(false); // check if user is creating account
  const navigate = useNavigate(); // for moving pages

  const SECRET_CODE = "2001"; // Admin secret code

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/admin-home');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Login to admin page
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
      setError('Invalid email or password.');
      console.error(err);
    }
  };

  // Create new admin account
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !adminCode) {
      setError('Please fill all fields.');
      return;
    }

    if (adminCode !== SECRET_CODE) {
      setError('Wrong Admin Code.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Admin account created. You can log in now.');
      setIsRegistering(false);
      setEmail('');
      setPassword('');
      setAdminCode('');
    } catch (err) {
      setError('Failed to create account. Maybe email already used.');
      console.error(err);
    }
  };

  return (
    <div className="admin-login-container">
      {/* Page title */}
      <h1>Admin {isRegistering ? 'Register' : 'Login'}</h1>

      {/* Show any error */}
      {error && <div className="error-message">{error}</div>}

      {/* Login form */}
      {!isRegistering && (
        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
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
      )}

      {/* Register form */}
      {isRegistering && (
        <form className="admin-login-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
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

          <div className="form-group">
            <label>Admin Code:</label>
            <input
              type="text"
              placeholder="Enter Admin Code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="create-button">Create</button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setIsRegistering(false);
                setAdminCode('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Back button */}
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Main
      </button>
    </div>
  );
};

export default AdminLogin;
