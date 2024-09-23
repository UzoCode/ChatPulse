import React from 'react';

interface Participant {
  id: string;
  name: string;
}

interface ParticipantListProps {
  participants: Participant[];
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participants }) => {
  return (
    <div className="w-64 bg-gray-800 p-4">
      <h2 className="text-xl mb-4">Participants</h2>
      {participants.map(participant => (
        <div key={participant.id} className="mb-2">{participant.name}</div>
      ))}
    </div>
  );
};

export default ParticipantList;