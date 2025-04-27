import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../styles/CheckStatus.css';

const CheckStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reportId, setReportId] = useState('');
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setReportId(id);
      fetchReport(id);
    }
  }, [location.search]);

  const fetchReport = async (id) => {
    try {
      const docRef = doc(db, 'reports', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReportData(docSnap.data());
        setError('');
      } else {
        setError('Report not found. Please check the ID and try again.');
      }
    } catch (err) {
      console.error('Error fetching report:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reportId.trim()) {
      fetchReport(reportId.trim());
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'accepted':
        return 'status-accepted';
      case 'flagged':
        return 'status-flagged';
      default:
        return '';
    }
  };

  return (
    <div className="check-status-container">
      <h1>Check Report Status</h1>

      <form className="check-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your Report ID"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
        />
        <button type="submit">Check Status</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {reportData && (
        <div className="report-details">
          <h2>Report Information</h2>
          <p><strong>Category:</strong> {reportData.category}</p>
          <p><strong>Subcategory:</strong> {reportData.subcategory}</p>
          <p><strong>Description:</strong> {reportData.description}</p>
          <p><strong>Location:</strong> {reportData.location}</p>
          <p><strong>Date:</strong> {reportData.date}</p>
          <p><strong>Time:</strong> {reportData.time}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={getStatusClass(reportData.status)}>
              {reportData.status}
            </span>
          </p>

          {reportData.fileUrl && (
            <div className="evidence-image">
              <p><strong>Evidence:</strong></p>
              <img src={reportData.fileUrl} alt="Evidence" />
            </div>
          )}
        </div>
      )}

      <button className="back-button" onClick={() => navigate('/user-home')}>
        Back to Home
      </button>
    </div>
  );
};

export default CheckStatus;
