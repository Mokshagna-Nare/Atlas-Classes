
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon, MenuIcon, XIcon, ChartBarIcon, ClipboardCheckIcon, UserIcon, CreditCardIcon } from '../../../components/icons';
import Tests from './components/Tests';
import Results from './components/Results';
import Fees from './components/Fees';
import Profile from './components/Profile';
import Analytics from './components/Analytics';

type DashboardView = 'profile' | 'tests' | 'results' | 'analytics' | 'fees';

const StudentDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>('profile');
  const [selectedTestIdForResult, setSelectedTestIdForResult] = useState<string | null>(null);
  const { user, logout } = useAuth()!;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    setTimeout(logout, 50);
  };

  const handleViewResult = (testId: string) => {
    setSelectedTestIdForResult(testId);
    setActiveView('results');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'profile': return <Profile />;
      case 'tests': return <Tests onViewResult={handleViewResult} />;
      case 'results': return <Results initialSelectedTestId={selectedTestIdForResult} onClearSelection={() => setSelectedTestIdForResult(null)} />;
      case 'analytics': return <Analytics />;
      case 'fees': return <Fees />;
      default: return <Profile />;
    }
  };

  const NavItem: React.FC<{ view: DashboardView, label: string, icon: React.ReactNode }> = ({ view, label, icon }) => (
    <button
      onClick={() => {
        setActiveView(view);
        setSelectedTestIdForResult(null); // Clear context when switching manually
        setIsSidebarOpen(false);
      }}
      className={`w-full text-left px-4 py-3 rounded-md transition-colors flex items-center space-x-3 ${
        activeView === view ? 'bg-emerald-900/30 text-atlas-primary font-bold border-l-4 border-atlas-primary' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex bg-atlas-dark text-white font-sans">
      {isSidebarOpen && (
          <div 
              className="fixed inset-0 bg-black/60 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
          ></div>
      )}
      <aside className={`fixed inset-y-0 left-0 bg-atlas-soft border-r border-gray-800 p-4 flex flex-col z-30 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-8">
            <div className="px-2">
                <img 
                    src="https://i.postimg.cc/xdCpx0Kj/Logo-new-(1).png" 
                    alt="Atlas Classes" 
                    className="h-16 w-auto object-contain" 
                />
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
              <XIcon className="h-6 w-6" />
            </button>
        </div>
        
        {/* User Badge in Sidebar */}
        <div className="px-2 mb-6 pb-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-atlas-primary/20 border border-atlas-primary flex items-center justify-center text-atlas-primary font-bold">
                    {user?.name?.charAt(0) || 'S'}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Student</p>
                </div>
            </div>
        </div>

        <nav className="flex-grow space-y-2">
            <NavItem view="profile" label="Dashboard Home" icon={<UserIcon className="h-5 w-5" />} />
            <NavItem view="tests" label="My Tests" icon={<ClipboardCheckIcon className="h-5 w-5" />} />
            <NavItem view="results" label="My Results" icon={<ChartBarIcon className="h-5 w-5" />} />
            <NavItem view="analytics" label="My Analytics" icon={<ChartBarIcon className="h-5 w-5" />} />
            <NavItem view="fees" label="My Fees" icon={<CreditCardIcon className="h-5 w-5" />} />
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-gray-800 hover:bg-red-900/30 text-gray-300 hover:text-red-400 transition-colors">
            <LogoutIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto bg-atlas-dark">
        <header className="md:hidden flex justify-between items-center mb-6">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-300 p-1">
            <MenuIcon className="h-6 w-6" />
          </button>
           <h1 className="text-xl font-bold truncate text-white">Hello, {user?.name}</h1>
        </header>
        <header className="hidden md:block mb-10">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-atlas-primary/10 rounded-2xl border border-atlas-primary/20">
                <UserIcon className="h-8 w-8 text-atlas-primary" />
             </div>
             <div>
                <h1 className="text-3xl font-black text-white">Welcome, {user?.name}</h1>
                <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mt-1">Student Academic Command Center</p>
             </div>
          </div>
        </header>
        <div className="animate-fade-in-up">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
