import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CheckStatus.css';

const CheckStatus = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState(reportId || '');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockReports = {
    '123456': { 
      id: '123456', 
      category: 'Environmental',
      subcategory: 'Illegal Dumping',
      status: 'Pending',
      dateSubmitted: '2023-05-10',
      lastUpdated: '2023-05-10'
    },
    '234567': {
      id: '234567',
      category: 'Transport',
      subcategory: 'Dangerous Driving',
      status: 'Accepted',
      dateSubmitted: '2023-05-05',
      lastUpdated: '2023-05-08'
    },
    '345678': {
      id: '345678',
      category: 'Community',
      subcategory: 'Vandalism',
      status: 'Flagged',
      dateSubmitted: '2023-05-01',
      lastUpdated: '2023-05-07'
    }
  };

  useEffect(() => {
    // Check if we have a report ID from the URL
    if (reportId) {
      checkReportStatus(reportId);
    }
  }, [reportId]);

  const checkReportStatus = (id) => {
    setIsLoading(true);
    setError('');

    // Simulate API call with timeout
    setTimeout(() => {
      if (mockReports[id]) {
        setReport(mockReports[id]);
      } else {
        setError('Report not found. Please check the ID and try again.');
        setReport(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      // Update URL to include the report ID
      navigate(`/check-status/${searchId}`);
      checkReportStatus(searchId);
    } else {
      setError('Please enter a Report ID');
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
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="reportId">Report ID:</label>
          <input
            type="text"
            id="reportId"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter your Report ID"
            required
          />
        </div>
        <button type="submit" className="search-button">
          Check Status
        </button>
      </form>
      
      {isLoading && <div className="loading">Loading...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {report && (
        <div className="report-status">
          <h2>Report Details</h2>
          <div className="status-card">
            <div className="status-row">
              <span className="label">Report ID:</span>
              <span className="value">{report.id}</span>
            </div>
            <div className="status-row">
              <span className="label">Category:</span>
              <span className="value">{report.category}</span>
            </div>
            <div className="status-row">
              <span className="label">Subcategory:</span>
              <span className="value">{report.subcategory}</span>
            </div>
            <div className="status-row">
              <span className="label">Date Submitted:</span>
              <span className="value">{report.dateSubmitted}</span>
            </div>
            <div className="status-row">
              <span className="label">Last Updated:</span>
              <span className="value">{report.lastUpdated}</span>
            </div>
            <div className="status-row">
              <span className="label">Status:</span>
              <span className={`value status-badge ${getStatusClass(report.status)}`}>
                {report.status}
              </span>
            </div>
          </div>
          
          <button 
            className="back-button" 
            onClick={() => navigate('/user-home')}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckStatus; 