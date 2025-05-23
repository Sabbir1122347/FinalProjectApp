### Anonymous Crime Reporting App

This is a web application that allows users to anonymously report crimes or incidents without sharing any personal information. It is built using React for the frontend and Firebase for backend services like Firestore Database, Storage, and Authentication.

The main aim of this project is to make it quick and easy for people to submit crime reports, while keeping everything fully anonymous and secure.

### Features

Anonymous crime reporting form
Location selection using an interactive map (Leaflet)
Upload images or videos as evidence
Google reCAPTCHA verification to prevent spam
Admin login and registration (protected by Admin Code)
Admin dashboard to view, filter, and update report statuses
Firebase Firestore for storing reports
Firebase Storage for saving uploaded files
Firebase Authentication for Admin access
Fully mobile responsive design

### Project Structure

/src
  /components    → React components (pages, forms, dashboard)
  /styles        → CSS files for styling
  /firebase.js   → Firebase configuration file
  App.js         → Main routing setup

### Admin Access

Admins need to register using a special Admin Code (2001) to create an account.
After logging in, they can:

View submitted reports
Filter reports by status (Pending, Accepted, Flagged)
Update the status of reports
View uploaded evidence