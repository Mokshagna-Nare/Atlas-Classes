
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon } from '../../../components/icons';
import Tests from './components/Tests';
import Results from './components/Results';
import Analysis from './components/Analysis';
import QuestionPapers from './components/QuestionPapers';

type DashboardView = 'tests' | 'papers' | 'results' | 'analysis';

const InstituteDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<DashboardView>('analysis');
  const { user, logout } = useAuth()!;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'tests': return <Tests />;
      case 'papers': return <QuestionPapers />;
      case 'results': return <Results />;
      case 'analysis': return <Analysis />;
      default: return <Analysis />;
    }
  };

  const NavItem: React.FC<{ view: DashboardView, label: string }> = ({ view, label }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
        activeView === view ? 'bg-atlas-orange text-white' : 'hover:bg-atlas-gray'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-atlas-black text-white">
      <aside className="w-64 bg-black p-4 flex flex-col">
        <div className="text-2xl font-bold text-atlas-orange mb-8">
          Atlas<span className="text-white">Portal</span>
        </div>
        <nav className="flex-grow space-y-2">
            <NavItem view="analysis" label="Analysis" />
            <NavItem view="results" label="Results" />
            <NavItem view="tests" label="Tests" />
            <NavItem view="papers" label="Question Papers" />
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-atlas-gray hover:bg-red-600/50 transition-colors">
            <LogoutIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-400">Here's your institute's performance overview.</p>
        </header>
        <div className="bg-atlas-gray p-6 rounded-lg">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default InstituteDashboard;
