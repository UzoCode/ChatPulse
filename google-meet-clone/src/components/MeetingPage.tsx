import React from 'react';

const MeetingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-3xl font-bold text-primary mb-6">Meeting Page</h1>
      <p>This is where the video meeting will take place.</p>
      {/* Add more components for video, chat, etc. here */}
    </div>
  );
};

export default MeetingPage;