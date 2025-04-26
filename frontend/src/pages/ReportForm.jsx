import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ReportForm.css';

import { db, storage } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ReportForm = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    subcategory: '',
    description: '',
    location: '',
    date: '',
    time: '',
    file: null
  });

  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');

  // Set category name and available subcategories
  useEffect(() => {
    const categoryMap = {
      'environmental': 'Environmental',
      'transport': 'Transport',
      'educational': 'Educational',
      'community': 'Community',
      'other': 'Other'
    };
    
    setCategoryName(categoryMap[categoryId] || 'Unknown');

    switch(categoryId) {
      case 'environmental':
        setSubcategories(['Littering', 'Pollution', 'Illegal Dumping', 'Wildlife Crime', 'Other']);
        break;
      case 'transport':
        setSubcategories(['Traffic Violations', 'Damaged Infrastructure', 'Public Transport Issues', 'Parking Violations', 'Other']);
        break;
      case 'educational':
        setSubcategories(['School Vandalism', 'Bullying', 'Theft', 'Safety Concerns', 'Other']);
        break;
      case 'community':
        setSubcategories(['Vandalism', 'Noise Complaints', 'Public Disturbance', 'Suspicious Activity', 'Other']);
        break;
      case 'other':
        setSubcategories(['Unclassified', 'General Concern', 'Suggestion']);
        break;
      default:
        setSubcategories([]);
    }
  }, [categoryId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  // Handle form submission and save to Firestore + Storage
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let fileUrl = null;

      if (formData.file) {
        console.log("Uploading file:", formData.file.name);  // Debug

        const fileRef = ref(storage, `evidence/${Date.now()}_${formData.file.name}`);
        const metadata = {
          contentType: formData.file.type,
        };
        
        const snapshot = await uploadBytes(fileRef, formData.file, metadata);
        

        console.log("Upload complete. Getting download URL...");  // Debug
        fileUrl = await getDownloadURL(snapshot.ref);

        console.log("File URL:", fileUrl);  // Debug
      }

      const docRef = await addDoc(collection(db, 'reports'), {
        category: categoryId,
        subcategory: formData.subcategory,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        fileUrl: fileUrl,
        status: 'pending',
        submittedAt: Timestamp.now()
      });

      console.log("Report submitted. ID:", docRef.id);  // Debug
      setReportId(docRef.id);
      setSubmitted(true);

    } catch (err) {
      console.error("❌ Error submitting report:", err);  // Debug
      alert("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="report-form-container">
        <div className="submission-success">
          <h2>Report Submitted Successfully</h2>
          <p>Your report has been submitted and will be reviewed soon.</p>
          <p>Your Report ID is: <strong>{reportId}</strong></p>
          <p>Please save this ID to check the status of your report later.</p>
          <div className="submission-buttons">
            <button onClick={() => navigate('/user-home')}>Back to Home</button>
            <button onClick={() => navigate(`/check-status?id=${reportId}`)}>Check Status</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-form-container">
      <h1>Submit a {categoryName} Report</h1>
      
      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subcategory">Subcategory:</label>
          <select 
            id="subcategory" 
            name="subcategory" 
            value={formData.subcategory}
            onChange={handleChange}
            required
          >
            <option value="">Select a subcategory</option>
            {subcategories.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description}
            onChange={handleChange}
            placeholder="Please provide details about the incident"
            required
            rows={5}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location}
            onChange={handleChange}
            placeholder="Where did this occur?"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input 
              type="time" 
              id="time" 
              name="time" 
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="file">Supporting Evidence (optional):</label>
          <input 
            type="file" 
            id="file" 
            name="file" 
            onChange={handleFileChange}
          />
          <small>Upload photos, videos, or documents related to the incident</small>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={() => navigate('/user-home')} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
