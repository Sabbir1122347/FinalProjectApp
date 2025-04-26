import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1>Anonymous Crime Reporting</h1>
      <div className="login-buttons">
        <button 
          className="login-button admin-button"
          onClick={() => navigate('/admin-login')}
        >
          Admin
        </button>
        <button 
          className="login-button user-button"
          onClick={() => navigate('/user-home')}
        >
          User
        </button>
      </div>
    </div>
  );
};

export default LoginPage; 