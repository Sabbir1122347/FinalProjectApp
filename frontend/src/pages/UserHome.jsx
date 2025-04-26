import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserHome.css';

const UserHome = () => {
  const [reportId, setReportId] = useState('');
  const navigate = useNavigate();

  const categories = [
    { id: 'environmental', name: 'Environmental', icon: '🌳' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'educational', name: 'Educational', icon: '🏫' },
    { id: 'community', name: 'Community', icon: '👥' },
    { id: 'other', name: 'Other', icon: '📝' },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/report-form/${categoryId}`);
  };

  const handleCheckStatus = () => {
    if (reportId.trim()) {
      navigate(`/check-status/${reportId}`);
    }
  };

  return (
    <div className="user-home-container">
      <h1>Anonymous Crime Reporting</h1>
      <h2>Select a category to report:</h2>
      
      <div className="categories-container">
        {categories.map(category => (
          <div 
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
      
      <div className="status-check-section">
        <h3>Check Report Status</h3>
        <div className="status-check-form">
          <input
            type="text"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
            placeholder="Enter Report ID"
          />
          <button onClick={handleCheckStatus}>Check Status</button>
        </div>
      </div>
    </div>
  );
};

export default UserHome; 