import React, { useState } from 'react';
import MeetingControls from './MeetingControls';
import VideoGrid from './VideoGrid';
import ChatBox from './ChatBox';
import ParticipantList from './ParticipantList';

const MeetingPage: React.FC = () => {
  const [participants, setParticipants] = useState([
    { id: 'local', stream: new MediaStream() },
    { id: 'remote1', stream: new MediaStream() },
  ]);

  // Add this function to use setParticipants
  const addParticipant = (id: string, stream: MediaStream) => {
    setParticipants(prev => [...prev, { id, stream }]);
  };

  const handleEndCall = () => {
    // Add logic to handle ending the call
    console.log('Call ended');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <div className="flex-grow flex">
        <div className="flex-grow p-4">
          <VideoGrid participants={participants} />
        </div>
        <div className="w-64 flex flex-col">
          <ParticipantList participants={participants.map(p => ({ id: p.id, name: `User ${p.id}` }))} />
          <ChatBox />
        </div>
      </div>
      <div className="p-4">
        <MeetingControls onEndCall={handleEndCall} />
      </div>
    </div>
  );
};

export default MeetingPage;