import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './firebase'; // This ensures Firebase is initialized
import LandingPage from './components/LandingPage';
import MeetingPage from './components/MeetingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/meeting" element={<MeetingPage />} />
      </Routes>
    </Router>
  );
}

export default App;