import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserHome.css';

const UserHome = () => {
  const navigate = useNavigate();
  const [reportId, setReportId] = useState('');

  const categories = [
    { id: 'environmental', name: 'Environmental', icon: '🌳', colorClass: 'environmental-card' },
    { id: 'transport', name: 'Transport', icon: '🚌', colorClass: 'transport-card' },
    { id: 'educational', name: 'Educational', icon: '🏫', colorClass: 'educational-card' },
    { id: 'community', name: 'Community', icon: '🏙️', colorClass: 'community-card' },
    { id: 'other', name: 'Other', icon: '📋', colorClass: 'other-card' }
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/report-form/${categoryId}`);
  };

  const handleCheckStatus = () => {
    if (reportId.trim()) {
      navigate(`/check-status?id=${reportId}`);
    }
  };

  return (
    <div className="user-home-container">
      <div className="banner">
        <img src="/Logo.png" alt="Anonymous Crime Reporting Banner" className="banner-image" />
      </div>

      <div className="category-section">
        <h2>Select a Category to Report</h2>
        <div className="category-cards">
          {categories.map(category => (
            <div 
              key={category.id} 
              className={`category-card ${category.colorClass}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="status-section">
        <h2>Check Your Report Status</h2>
        <div className="status-check">
          <input
            type="text"
            placeholder="Enter your Report ID"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
          />
          <button onClick={handleCheckStatus}>Check Status</button>
        </div>
      </div>

      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        Back to Main
      </button>
    </div>
  );
};

export default UserHome;