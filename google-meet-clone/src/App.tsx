import React from 'react';
import VideoGrid from './components/VideoGrid';
import ControlBar from './components/ControlBar';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800">Google Meet Clone</h1>
      </header>
      <main className="flex-grow">
        <VideoGrid />
      </main>
      <footer>
        <ControlBar />
      </footer>
    </div>
  );
}

export default App;