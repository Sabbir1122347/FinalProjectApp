import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/CheckStatus.css';

const CheckStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportId, setReportId] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [reportStatus, setReportStatus] = useState(null);
  const [error, setError] = useState('');
  
  // Mock data for report statuses
  const reportDatabase = {
    'R001': { status: 'Pending', category: 'Environmental', date: '2023-05-15' },
    'R002': { status: 'Accepted', category: 'Transport', date: '2023-05-14' },
    'R003': { status: 'Flagged', category: 'Community', date: '2023-05-13' },
    'R004': { status: 'Pending', category: 'Educational', date: '2023-05-12' },
    'R005': { status: 'Accepted', category: 'Other', date: '2023-05-11' },
  };

  useEffect(() => {
    // Check if a report ID was passed in the URL query parameters
    const params = new URLSearchParams(location.search);
    const idFromQuery = params.get('id');
    
    if (idFromQuery) {
      setReportId(idFromQuery);
      handleCheckStatus(idFromQuery);
    }
  }, [location.search]);

  const handleCheckStatus = (id = reportId) => {
    setError('');
    setSearchPerformed(true);
    
    // Look up the report in our mock database
    if (reportDatabase[id]) {
      setReportStatus(reportDatabase[id]);
    } else {
      setReportStatus(null);
      setError('Report not found. Please check the ID and try again.');
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Pending': return 'status-pending';
      case 'Accepted': return 'status-accepted';
      case 'Flagged': return 'status-flagged';
      default: return '';
    }
  };

  return (
    <div className="check-status-container">
      <h1>Check Report Status</h1>
      
      <div className="status-search">
        <input
          type="text"
          placeholder="Enter Report ID (e.g., R001)"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
        />
        <button onClick={() => handleCheckStatus()}>Check Status</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {searchPerformed && reportStatus && (
        <div className="status-result">
          <h2>Report Status</h2>
          <div className="status-details">
            <div className="status-row">
              <div className="status-label">Report ID:</div>
              <div className="status-value">{reportId}</div>
            </div>
            <div className="status-row">
              <div className="status-label">Category:</div>
              <div className="status-value">{reportStatus.category}</div>
            </div>
            <div className="status-row">
              <div className="status-label">Date Submitted:</div>
              <div className="status-value">{reportStatus.date}</div>
            </div>
            <div className="status-row">
              <div className="status-label">Status:</div>
              <div className={`status-value ${getStatusClass(reportStatus.status)}`}>
                {reportStatus.status}
              </div>
            </div>
          </div>
          
          <div className="status-message">
            {reportStatus.status === 'Pending' && (
              <p>Your report is currently being reviewed. Thank you for your patience.</p>
            )}
            {reportStatus.status === 'Accepted' && (
              <p>Your report has been accepted and is being actioned. Thank you for your contribution.</p>
            )}
            {reportStatus.status === 'Flagged' && (
              <p>Your report requires additional information. Please contact our support team.</p>
            )}
          </div>
        </div>
      )}
      
      <button 
        className="back-button"
        onClick={() => navigate('/user-home')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default CheckStatus; 