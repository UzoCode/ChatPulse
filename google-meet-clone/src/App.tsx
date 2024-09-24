import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './firebase'; // This ensures Firebase is initialized
import LandingPage from './components/LandingPage';
import MeetingPage from './components/MeetingPage';

function App() {
  const isAuthenticated = !!localStorage.getItem('id_token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/meeting" element={isAuthenticated ? <MeetingPage /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;