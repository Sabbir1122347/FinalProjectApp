import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import '../styles/AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reports'));
        const fetchedReports = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReports(fetchedReports);
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };

    fetchReports();
  }, []);

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, { status: newStatus });
      setReports(prev =>
        prev.map(report =>
          report.id === reportId ? { ...report, status: newStatus } : report
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
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

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="admin-home-container">
      <h1>Admin Dashboard</h1>
      <div className="report-table">
        <div className="table-header">
          <div>ID</div>
          <div>Category</div>
          <div>Subcategory</div>
          <div>Location</div>
          <div>Coordinates</div>
          <div>Description</div>
          <div>Date</div>
          <div>Status/Action</div>
          <div>Evidence</div>
        </div>

        {reports.map(report => (
          <div className="table-row" key={report.id}>
            <div>{report.customId || report.id.slice(0, 8)}</div>
            <div>{report.category}</div>
            <div>{report.subcategory || '-'}</div>
            <div>{report.location || '-'}</div>
            <div>
              {report.coordinates
                ? `${report.coordinates.lat.toFixed(5)}, ${report.coordinates.lng.toFixed(5)}`
                : '-'}
            </div>
            <div>{report.description}</div>
            <div>{report.date}</div>
            <div className="status-action">
              <span className={`status-badge ${getStatusClass(report.status)}`}>
                {report.status}
              </span>
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
                'No Evidence'
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default AdminHome;
