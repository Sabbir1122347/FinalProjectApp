import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import ReportForm from './pages/ReportForm';
import CheckStatus from './pages/CheckStatus';
import './App.css';

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
          <Route path="/check-status/:reportId" element={<CheckStatus />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
