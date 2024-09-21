import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VideoGrid from './components/VideoGrid';
import ControlBar from './components/ControlBar';
import AdminControls from './components/AdminControls';

function App() {
  // This should be determined by your authentication system
  const isAdmin = false;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LandingPage />} />
          <Route path="/meeting" element={
            <div className="flex flex-col h-screen">
              <div className="flex-grow overflow-hidden">
                <VideoGrid />
              </div>
              {isAdmin && <AdminControls />}
              <ControlBar />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;