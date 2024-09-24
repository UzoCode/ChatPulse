import React from 'react';
// Remove the VideoTile import if it's not being used
// import VideoTile from './VideoTile';

interface Participant {
  id: string;
  stream: MediaStream;
}

interface VideoGridProps {
  participants: Participant[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ participants }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {participants.map((participant) => (
        <div key={participant.id} className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
          {/* Implement video rendering logic here */}
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;