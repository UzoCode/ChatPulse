import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl">404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;