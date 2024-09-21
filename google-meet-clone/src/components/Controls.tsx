import React from 'react';
import { MicrophoneIcon, VideoCameraIcon, PhoneIcon } from '@heroicons/react/solid';

const Controls: React.FC = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-center space-x-4">
      <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
        <MicrophoneIcon className="h-6 w-6 text-gray-700" />
      </button>
      <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
        <VideoCameraIcon className="h-6 w-6 text-gray-700" />
      </button>
      <button className="p-2 rounded-full bg-red-500 hover:bg-red-600">
        <PhoneIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default Controls;