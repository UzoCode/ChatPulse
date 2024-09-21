import React from 'react';

const AdminControls: React.FC = () => {
  return (
    <div className="bg-gray-100 p-2 flex justify-center space-x-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">Mute All</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">Remove Participant</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">Lock Meeting</button>
    </div>
  );
};

export default AdminControls;