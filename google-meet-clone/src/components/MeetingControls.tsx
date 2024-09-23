import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaPhoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaCircle } from 'react-icons/fa';

interface MeetingControlsProps {
  onEndCall: () => void;
}

const MeetingControls: React.FC<MeetingControlsProps> = ({ onEndCall }) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    // Add logic to enable/disable microphone
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // Add logic to enable/disable video
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // Implement screen sharing logic
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement recording logic
  };

  return (
    <div className="flex justify-center space-x-4 p-4 bg-gray-800 rounded-lg">
      <button
        onClick={toggleMic}
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
      >
        {isMicOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
      </button>
      <button
        onClick={toggleVideo}
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
      >
        {isVideoOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
      </button>
      <button
        onClick={toggleScreenShare}
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
      >
        <FaDesktop size={24} />
      </button>
      <button
        onClick={toggleRecording}
        className={`p-2 rounded-full ${isRecording ? 'bg-red-600' : 'bg-gray-700'} hover:bg-gray-600 text-white`}
      >
        <FaCircle size={24} />
      </button>
      <button
        onClick={onEndCall}
        className="p-2 rounded-full bg-red-600 hover:bg-red-500 text-white"
      >
        <FaPhoneSlash size={24} />
      </button>
    </div>
  );
};

export default MeetingControls;