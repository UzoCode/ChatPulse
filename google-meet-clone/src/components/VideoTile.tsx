import React from 'react';

interface VideoTileProps {
  name: string;
  isActive: boolean;
}

const VideoTile: React.FC<VideoTileProps> = ({ name, isActive }) => {
  return (
    <div className={`relative bg-gray-800 rounded-lg w-full h-full flex items-center justify-center overflow-hidden ${isActive ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="text-white text-2xl">Video Placeholder</div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
        <span>{name}</span>
      </div>
    </div>
  );
};

export default VideoTile;