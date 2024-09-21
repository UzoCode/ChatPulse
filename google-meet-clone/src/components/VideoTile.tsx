import React from 'react';

interface VideoTileProps {
  name: string;
}

const VideoTile: React.FC<VideoTileProps> = ({ name }) => {
  return (
    <div className="bg-gray-300 aspect-video rounded-lg flex items-center justify-center">
      <span className="text-2xl font-semibold text-gray-700">{name}</span>
    </div>
  );
};

export default VideoTile;