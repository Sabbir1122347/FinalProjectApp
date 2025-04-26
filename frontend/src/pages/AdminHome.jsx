import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // make sure this path is correct
import '../styles/AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const querySnapshot = await getDocs(collection(db, 'reports'));
      const reportsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(reportsData);
    };

    fetchReports();
  }, []);

  const handleStatusChange = async (reportId, newStatus) => {
    const reportRef = doc(db, 'reports', reportId);
    await updateDoc(reportRef, { status: newStatus });
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );
  };

  return (
    <div className="admin-home-container">
      <h1>Submitted Reports</h1>
      <div className="reports-table">
        <div className="reports-header">
          <div>ID</div>
          <div>Category</div>
          <div>Description</div>
          <div>Date</div>
          <div>Status</div>
          <div>Evidence</div>
          <div>Actions</div>
        </div>
        {reports.map((report) => (
          <div key={report.id} className="reports-row">
            <div>{report.id}</div>
            <div>{report.category}</div>
            <div className="description-cell">{report.description}</div>
            <div>{report.date}</div>
            <div className={`status ${report.status?.toLowerCase()}`}>{report.status}</div>
            <div>
              {report.fileUrl ? (
                <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
                  <img src={report.fileUrl} alt="Evidence" className="evidence-image" />
                </a>
              ) : (
                "No Evidence"
              )}
            </div>
            <div>
              <select
                value={report.status}
                onChange={(e) => handleStatusChange(report.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <button className="logout-button" onClick={() => navigate('/')}>
        Logout
      </button>
    </div>
  );
};

export default AdminHome;
