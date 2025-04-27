import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="logo-wrapper">
        <img src="/Logo.png" alt="Anonymous Crime Reporting" className="login-logo" />
      </div>

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
