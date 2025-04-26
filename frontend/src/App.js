import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import all pages
import LoginPage from './pages/LoginPage';
import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import ReportForm from './pages/ReportForm';
import CheckStatus from './pages/CheckStatus';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/report-form/:categoryId" element={<ReportForm />} />
          <Route path="/check-status" element={<CheckStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
