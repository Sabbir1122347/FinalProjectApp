import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ReportForm.css';

const ReportForm = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    subcategory: '',
    description: '',
    location: '',
    date: '',
    time: '',
    file: null,
  });
  
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState('');
  
  useEffect(() => {
    // Set category name and subcategories based on the categoryId from URL
    const categories = {
      'environmental': {
        name: 'Environmental',
        subcategories: ['Illegal Dumping', 'Pollution', 'Wildlife Crime', 'Other Environmental Issue']
      },
      'transport': {
        name: 'Transport',
        subcategories: ['Dangerous Driving', 'Parking Violations', 'Public Transport Issue', 'Other Transport Issue']
      },
      'educational': {
        name: 'Educational',
        subcategories: ['Bullying', 'Vandalism', 'Theft', 'Other Educational Issue']
      },
      'community': {
        name: 'Community',
        subcategories: ['Anti-social Behaviour', 'Noise Complaint', 'Public Property Damage', 'Other Community Issue']
      },
      'other': {
        name: 'Other',
        subcategories: ['Suspicious Activity', 'Harassment', 'Fraud', 'Other Uncategorized Issue']
      }
    };
    
    if (categories[categoryId]) {
      setCategoryName(categories[categoryId].name);
      setSubcategories(categories[categoryId].subcategories);
    } else {
      // Handle invalid category ID
      navigate('/user-home');
    }
  }, [categoryId, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a mock report ID
    const reportId = Math.floor(100000 + Math.random() * 900000).toString();
    
    // In a real application, you would send this data to your backend
    console.log('Submitting report:', {
      reportId,
      category: categoryName,
      ...formData
    });
    
    // Show success message with the report ID
    setSubmissionMessage(`Your report has been submitted. Your Report ID is: ${reportId}`);
    
    // Clear form after submission
    setFormData({
      subcategory: '',
      description: '',
      location: '',
      date: '',
      time: '',
      file: null,
    });
    
    // You could redirect after a delay
    setTimeout(() => {
      setSubmissionMessage('');
      navigate('/user-home');
    }, 5000);
  };
  
  return (
    <div className="report-form-container">
      <h1>Report {categoryName} Issue</h1>
      
      {submissionMessage ? (
        <div className="submission-message">
          {submissionMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="report-form">
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
              {subcategories.map((sub, index) => (
                <option key={index} value={sub}>{sub}</option>
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
              rows="4"
              placeholder="Describe the issue in detail"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the location"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group half">
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
            
            <div className="form-group half">
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
            <label htmlFor="file">Upload Evidence (optional):</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
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
      )}
    </div>
  );
};

export default ReportForm; 