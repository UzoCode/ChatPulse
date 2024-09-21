import './App.css';

import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import Controls from './components/Controls';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <VideoGrid />
      </main>
      <Controls />
    </div>
  );
}

export default App;