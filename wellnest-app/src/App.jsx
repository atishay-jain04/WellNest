import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ZenMode from './components/ZenMode';
import FocusTimer from './components/FocusTimer';
import WellnessChatbot from './components/WellnessChatbot';
import ToDoList from './components/ToDoList';

function App() {
  const [activeTab, setActiveTab] = useState('zen');

  // Render the active component based on the selected tab
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'zen':
        return <ZenMode />;
      case 'timer':
        return <FocusTimer />;
      case 'chatbot':
        return <WellnessChatbot />;
      case 'todo':
        return <ToDoList />;
      default:
        return <ZenMode />;
    }
  };

  return (
    <div className="relative h-screen bg-gray-50">
      {/* Floating Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area - Full width */}
      <main className="h-full p-8 overflow-auto">
        <div className="h-full bg-white rounded-3xl shadow-md p-8 transition-all duration-300 max-w-7xl mx-auto">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  );
}

export default App;
