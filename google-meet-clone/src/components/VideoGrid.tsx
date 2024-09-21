import React from 'react';
import VideoTile from './VideoTile';

const VideoGrid: React.FC = () => {
  // Simulated participants data
  const participants = [
    { id: 1, name: 'John Doe', isActive: true },
    { id: 2, name: 'Jane Smith', isActive: false },
    // { id: 3, name: 'Alice Johnson', isActive: false },
    // { id: 4, name: 'Bob Brown', isActive: false },
    // { id: 5, name: 'Charlie Davis', isActive: false },
    // { id: 6, name: 'Eva Wilson', isActive: false },
  ];

  const getGridClass = (count: number) => {
    switch (count) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-2 grid-rows-2';
      default:
        return 'grid-cols-3 sm:grid-cols-4';
    }
  };

  const gridClass = `grid gap-2 p-2 h-full ${getGridClass(participants.length)}`;

  return (
    <div className={gridClass}>
      {participants.map((participant) => (
        <VideoTile key={participant.id} name={participant.name} isActive={participant.isActive} />
      ))}
    </div>
  );
};

export default VideoGrid;