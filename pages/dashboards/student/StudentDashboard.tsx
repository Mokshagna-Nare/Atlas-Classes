import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon, MenuIcon, XIcon } from '../../../components/icons';
import Tests from './components/Tests';
import Results from './components/Results';
import Fees from './components/Fees';
import Profile from './components/Profile';

type DashboardView = 'profile' | 'tests' | 'results' | 'fees';

const StudentDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>('profile');
  const { user, logout } = useAuth()!;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    setTimeout(logout, 50);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'profile': return <Profile />;
      case 'tests': return <Tests />;
      case 'results': return <Results />;
      case 'fees': return <Fees />;
      default: return <Profile />;
    }
  };

  const NavItem: React.FC<{ view: DashboardView, label: string }> = ({ view, label }) => (
    <button
      onClick={() => {
        setActiveView(view);
        setIsSidebarOpen(false);
      }}
      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
        activeView === view ? 'bg-atlas-orange text-white' : 'hover:bg-atlas-gray'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-atlas-black text-white">
      {isSidebarOpen && (
          <div 
              className="fixed inset-0 bg-black/60 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
          ></div>
      )}
      <aside className={`fixed inset-y-0 left-0 bg-black p-4 flex flex-col z-30 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold text-atlas-orange">
              Atlas<span className="text-white">Portal</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
              <XIcon className="h-6 w-6" />
            </button>
        </div>
        <nav className="flex-grow space-y-2">
            <NavItem view="profile" label="My Profile" />
            <NavItem view="tests" label="My Tests" />
            <NavItem view="results" label="My Results" />
            <NavItem view="fees" label="My Fees" />
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-atlas-gray hover:bg-red-600/50 transition-colors">
            <LogoutIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <header className="md:hidden flex justify-between items-center mb-4">
          <button onClick={() => setIsSidebarOpen(true)} className="text-white p-1">
            <MenuIcon className="h-6 w-6" />
          </button>
           <h1 className="text-xl font-bold truncate">Welcome, {user?.name}</h1>
        </header>
        <header className="hidden md:block mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-400">Your personal academic dashboard.</p>
        </header>
        <div className="bg-atlas-gray p-4 sm:p-6 rounded-lg">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;