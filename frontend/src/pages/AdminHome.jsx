import React from 'react';
import '../styles/AdminHome.css';

const AdminHome = () => {
  // Mock data for reports
  const reports = [
    { id: '001', category: 'Environmental', description: 'Illegal dumping near river', status: 'Pending', date: '2023-05-10' },
    { id: '002', category: 'Transport', description: 'Dangerous driving on High Street', status: 'Accepted', date: '2023-05-08' },
    { id: '003', category: 'Community', description: 'Vandalism in local park', status: 'Flagged', date: '2023-05-07' },
    { id: '004', category: 'Educational', description: 'Bullying at secondary school', status: 'Accepted', date: '2023-05-05' },
    { id: '005', category: 'Other', description: 'Noise complaint from construction site', status: 'Pending', date: '2023-05-03' },
  ];

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
      
      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.category}</td>
                <td>{report.description}</td>
                <td>{report.date}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td>
                  <button className="action-button view">View</button>
                  <button className="action-button update">Update Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome; 