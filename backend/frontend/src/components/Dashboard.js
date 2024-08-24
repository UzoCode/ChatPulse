import React from 'react';
import ProfileCard from '../components/ProfileCard';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ProfileCard 
        image="/static/images/cards/yosemite.jpeg"
        location="Yosemite National Park, California, USA"
        isActive={true}
      />
    </div>
  );
};

export default Dashboard;
