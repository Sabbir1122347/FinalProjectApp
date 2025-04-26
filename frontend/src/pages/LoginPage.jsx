import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  const handleUserClick = () => {
    navigate('/user-home');
  };

  return (
    <div className="login-container">
      <h1>Anonymous Crime Reporting</h1>
      <div className="login-options">
        <button className="login-button admin" onClick={handleAdminClick}>
          Admin
        </button>
        <button className="login-button user" onClick={handleUserClick}>
          User
        </button>
      </div>
    </div>
  );
};

export default LoginPage; 