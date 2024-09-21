import React from 'react';
import VideoTile from './VideoTile';

const VideoGrid: React.FC = () => {
  // In a real application, you would manage participants dynamically
  const participants = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {participants.map((participant) => (
        <VideoTile key={participant} />
      ))}
    </div>
  );
};

export default VideoGrid;