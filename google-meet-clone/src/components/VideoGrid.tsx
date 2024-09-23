import React from 'react';
import VideoTile from './VideoTile';

interface VideoGridProps {
  participants: { id: string; stream: MediaStream }[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ participants }) => {
  const gridClass = participants.length <= 2 ? 'grid-cols-1' :
                    participants.length <= 4 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {participants.map(participant => (
        <video key={participant.id} autoPlay playsInline muted={participant.id === 'local'} />
      ))}
    </div>
  );
};

export default VideoGrid;