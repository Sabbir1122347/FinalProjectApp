import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();
  
  // Mock data for reports
  const [reports, setReports] = useState([
    { id: 'R001', category: 'Environmental', description: 'Illegal dumping near River Thames', status: 'Pending', date: '2023-05-15' },
    { id: 'R002', category: 'Transport', description: 'Damaged traffic light at High Street', status: 'Accepted', date: '2023-05-14' },
    { id: 'R003', category: 'Community', description: 'Graffiti on community center wall', status: 'Flagged', date: '2023-05-13' },
    { id: 'R004', category: 'Educational', description: 'Broken playground equipment at primary school', status: 'Pending', date: '2023-05-12' },
    { id: 'R005', category: 'Other', description: 'Suspicious activity near the park', status: 'Accepted', date: '2023-05-11' },
  ]);

  const handleStatusChange = (reportId, newStatus) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
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
    <div className="admin-home-container">
      <h1>Admin Dashboard</h1>
      <h2>Submitted Reports</h2>
      
      <div className="reports-list">
        <div className="report-header">
          <div className="report-id">ID</div>
          <div className="report-category">Category</div>
          <div className="report-description">Description</div>
          <div className="report-date">Date</div>
          <div className="report-status">Status</div>
          <div className="report-actions">Actions</div>
        </div>
        
        {reports.map(report => (
          <div key={report.id} className="report-item">
            <div className="report-id">{report.id}</div>
            <div className="report-category">{report.category}</div>
            <div className="report-description">{report.description}</div>
            <div className="report-date">{report.date}</div>
            <div className={`report-status ${getStatusClass(report.status)}`}>
              {report.status}
            </div>
            <div className="report-actions">
              <select 
                value={report.status}
                onChange={(e) => handleStatusChange(report.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Flagged">Flagged</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="logout-button"
        onClick={() => navigate('/')}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHome; 