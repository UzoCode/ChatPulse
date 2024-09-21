import React from 'react';
import VideoTile from './VideoTile';

const VideoGrid: React.FC = () => {
  // Mock participants
  const participants = [
    { id: 1, name: 'You' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Jane Smith' },
    { id: 4, name: 'Bob Johnson' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {participants.map((participant) => (
        <VideoTile key={participant.id} name={participant.name} />
      ))}
    </div>
  );
};

export default VideoGrid;