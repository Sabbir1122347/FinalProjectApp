import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');

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

  const filteredReports = reports.filter(report =>
    report.category?.toLowerCase().includes(search.toLowerCase()) ||
    report.description?.toLowerCase().includes(search.toLowerCase()) ||
    report.date?.includes(search)
  );

  return (
    <div className="admin-home-container">
      <h1>Submitted Reports</h1>

      <input
        type="text"
        className="search-bar"
        placeholder="Search by Category, Description, Date..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="reports-table">
        <div className="reports-header">
          <div>ID</div>
          <div>Category</div>
          <div>Description</div>
          <div>Date</div>
          <div>Evidence</div>
          <div>Status / Actions</div>
        </div>

        {filteredReports.map((report) => (
          <div key={report.id} className="reports-row">
            <div>{report.id}</div>
            <div>{report.category}</div>
            <div>{report.description}</div>
            <div>{report.date}</div>
            <div className="cell-evidence">
              {report.fileUrl ? (
                <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
                  <img src={report.fileUrl} alt="Evidence" className="evidence-image" />
                </a>
              ) : (
                "No Evidence"
              )}
            </div>
            <div>
              <div className={`status ${report.status?.toLowerCase()}`}>{report.status}</div>
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

