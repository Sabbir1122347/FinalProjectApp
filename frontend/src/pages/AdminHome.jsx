import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import '../styles/AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reports'));
      const fetchedReports = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(fetchedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, { status: newStatus });
      setReports(prev => prev.map(report => report.id === reportId ? { ...report, status: newStatus } : report));
    } catch (error) {
      console.error('Error updating status:', error);
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
    <div className="admin-home-container">
      <h1>Admin Dashboard</h1>

      <div className="reports-list">
        <div className="report-header">
          <div>ID</div>
          <div>Category</div>
          <div>Description</div>
          <div>Date</div>
          <div>Status/Action</div>
          <div>Evidence</div>
        </div>

        {reports.map((report) => (
          <div key={report.id} className="report-item">
            <div>{report.id}</div>
            <div>{report.category}</div>
            <div className="description-cell">{report.description}</div>
            <div>{report.date}</div>
            <div>
              <span className={`status-badge ${getStatusClass(report.status)}`}>{report.status}</span>
              <select
                value={report.status}
                onChange={(e) => handleStatusChange(report.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
            <div>
              {report.fileUrl ? (
                <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">View</a>
              ) : (
                'No file'
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="logout-button" onClick={() => navigate('/')}>Logout</button>
    </div>
  );
};

export default AdminHome;
