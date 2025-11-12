import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon, SparklesIcon, ChartBarIcon, DocumentTextIcon, ClipboardCheckIcon, DocumentDuplicateIcon } from '../../../components/icons';
import Tests from './components/Tests';
import Results from './components/Results';
import Analysis from './components/Analysis';
import QuestionPapers from './components/QuestionPapers';
import AIPaperGenerator from './components/AIPaperGenerator';

type DashboardView = 'tests' | 'papers' | 'results' | 'analysis' | 'ai-generator';

const InstituteDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<DashboardView>('ai-generator');
  const { user, logout } = useAuth()!;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    // Use a small timeout to ensure navigation starts before auth state is cleared,
    // preventing the ProtectedRoute from redirecting to login.
    setTimeout(logout, 50);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'ai-generator': return <AIPaperGenerator />;
      case 'analysis': return <Analysis />;
      case 'results': return <Results />;
      case 'tests': return <Tests />;
      case 'papers': return <QuestionPapers />;
      default: return <AIPaperGenerator />;
    }
  };

  const NavItem: React.FC<{ view: DashboardView, label: string, icon: React.ReactNode }> = ({ view, label, icon }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full text-left px-4 py-3 rounded-md transition-colors flex items-center space-x-3 ${
        activeView === view ? 'bg-atlas-orange text-white' : 'text-gray-300 hover:bg-atlas-gray hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex bg-atlas-black text-white font-sans">
      <aside className="w-64 bg-black p-4 flex flex-col">
        <div className="text-2xl font-bold text-atlas-orange mb-8 px-2">
          Atlas<span className="text-white">Portal</span>
        </div>
        <nav className="flex-grow space-y-2">
            <NavItem view="ai-generator" label="AI Paper Generator" icon={<SparklesIcon className="h-5 w-5" />} />
            <NavItem view="analysis" label="Analysis" icon={<ChartBarIcon className="h-5 w-5" />} />
            <NavItem view="results" label="Results" icon={<DocumentTextIcon className="h-5 w-5" />} />
            <NavItem view="tests" label="Tests" icon={<ClipboardCheckIcon className="h-5 w-5" />} />
            <NavItem view="papers" label="Question Papers" icon={<DocumentDuplicateIcon className="h-5 w-5" />} />
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