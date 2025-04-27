import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import ReCAPTCHA from 'react-google-recaptcha';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import '../styles/ReportForm.css';
import 'leaflet/dist/leaflet.css';

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
    coordinates: null
  });

  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');
  const [customReportId, setCustomReportId] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const todayDate = new Date().toISOString().split('T')[0];
  const nowTime = new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0,5);

  useEffect(() => {
    const categoryMap = {
      'environmental': 'Environmental',
      'transport': 'Transport',
      'educational': 'Educational',
      'community': 'Community',
      'other': 'Other'
    };
    setCategoryName(categoryMap[categoryId] || 'Unknown');

    switch (categoryId) {
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

  const handleMapClick = (e) => {
    setFormData(prev => ({
      ...prev,
      coordinates: e.latlng
    }));
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick
    });
    return null;
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert("Please complete the captcha verification before submitting!");
      return;
    }

    if (!formData.coordinates) {
      alert("Please select a location on the map!");
      return;
    }

    try {
      let fileUrl = null;

      if (formData.file) {
        const fileRef = ref(storage, `evidence/${Date.now()}_${formData.file.name}`);
        const snapshot = await uploadBytes(fileRef, formData.file);
        fileUrl = await getDownloadURL(snapshot.ref);
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
        submittedAt: Timestamp.now(),
        coordinates: formData.coordinates
          ? {
              lat: formData.coordinates.lat,
              lng: formData.coordinates.lng
            }
          : null
      });

      setReportId(docRef.id);
      setCustomReportId(docRef.id);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting report:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="report-form-container">
        <div className="submission-success">
          <h2>Report Submitted Successfully</h2>
          <p>Your report has been submitted and will be reviewed soon.</p>
          <p>Your Report ID is: <strong>{customReportId}</strong></p>
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
            rows={4}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location (optional description):</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Write something about the location"
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
              max={todayDate}
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
              max={formData.date === todayDate ? nowTime : undefined}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Select Location on Map:</label>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "300px", width: "100%", marginTop: "10px" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <MapClickHandler />
            {formData.coordinates && (
              <Marker
                position={formData.coordinates}
                icon={L.icon({
                  iconUrl: markerIconPng,
                  shadowUrl: markerShadowPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })}
              />
            )}
          </MapContainer>
        </div>
        <div className="form-group">
          <label htmlFor="file">Upload Evidence (optional):</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
          <small>Upload any photo, video, or document related to the incident</small>
        </div>
        <div className="form-group captcha-container">
          <ReCAPTCHA
            sitekey="6Lcj-yUrAAAAAFlkyGCkXaR6JfyZ2iBI4M8sdkb6"
            onChange={handleCaptchaChange}
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
    </div>
  );
};

export default ReportForm;
