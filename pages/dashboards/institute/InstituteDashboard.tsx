
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LogoutIcon, MenuIcon, XIcon, 
  AcademicCapIcon, UserGroupIcon, 
  ChartBarIcon, Squares2X2Icon, 
  ClipboardDocumentListIcon, SparklesIcon 
} from '../../../components/icons';
import HomeOverview from './components/HomeOverview';
import AcademicsManager from './components/AcademicsManager';
import StudentManager from './components/StudentManager';
import AnalysisCenter from './components/AnalysisCenter';
import SharedPapers from './components/SharedPapers';

type DashboardView = 'home' | 'academics' | 'students' | 'analysis' | 'shared-papers';

const InstituteDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>('home');
  const [viewState, setViewState] = useState<any>(null); // To store sub-tab info (e.g., active step in student manager)
  
  const { user, logout } = useAuth()!;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    setTimeout(logout, 50);
  };

  const handleNavigate = (view: DashboardView, subState?: any) => {
    setActiveView(view);
    setViewState(subState);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'home': return <HomeOverview onNavigate={handleNavigate} />;
      case 'academics': return <AcademicsManager initialTab={viewState?.tab} />;
      case 'students': return <StudentManager initialStep={viewState?.step} />;
      case 'analysis': return <AnalysisCenter />;
      case 'shared-papers': return <SharedPapers />;
      default: return <HomeOverview onNavigate={handleNavigate} />;
    }
  };

  const NavItem: React.FC<{ view: DashboardView, label: string, icon: React.ReactNode }> = ({ view, label, icon }) => (
    <button
      onClick={() => handleNavigate(view)}
      className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-center space-x-3 group ${
        activeView === view 
        ? 'bg-atlas-primary/10 text-atlas-primary font-bold shadow-[inset_0_0_10px_rgba(16,185,129,0.05)] border-l-4 border-atlas-primary' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className={`transition-colors ${activeView === view ? 'text-atlas-primary' : 'text-gray-500 group-hover:text-atlas-primary'}`}>
        {icon}
      </div>
      <span className="text-sm tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex bg-atlas-dark text-white font-sans selection:bg-atlas-primary/30">
      {isSidebarOpen && (
          <div 
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
          ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-atlas-soft border-r border-white/5 p-6 flex flex-col z-50 w-72 transform transition-all duration-500 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10">
            <div className="px-2">
                <img 
                    src="https://i.postimg.cc/xdCpx0Kj/Logo-new-(1).png" 
                    alt="Atlas Classes" 
                    className="h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
                />
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-white p-2">
                <XIcon className="h-6 w-6" />
            </button>
        </div>

        <div className="mb-8 px-2">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Command Center</p>
            <nav className="space-y-1">
                <NavItem view="home" label="Dashboard Home" icon={<Squares2X2Icon className="h-5 w-5" />} />
                <NavItem view="academics" label="Academic Structure" icon={<AcademicCapIcon className="h-5 w-5" />} />
                <NavItem view="students" label="Student Central" icon={<UserGroupIcon className="h-5 w-5" />} />
                <NavItem view="analysis" label="Performance Intelligence" icon={<ChartBarIcon className="h-5 w-5" />} />
                <NavItem view="shared-papers" label="Exams & Papers" icon={<ClipboardDocumentListIcon className="h-5 w-5" />} />
            </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
            <div className="bg-atlas-black/40 p-4 rounded-2xl border border-white/5 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-atlas-primary/20 border border-atlas-primary/30 flex items-center justify-center text-atlas-primary font-black">
                    {user?.name?.charAt(0)}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate text-white">{user?.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Administrator</p>
                </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-red-900/10 hover:bg-red-900/20 text-red-500 transition-all border border-red-900/20 group">
                <LogoutIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-bold uppercase tracking-widest">Sign Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-atlas-dark relative">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-atlas-dark/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-10 py-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 p-2 hover:text-white transition-colors">
                    <MenuIcon className="h-6 w-6" />
                </button>
                <div>
                    <h2 className="text-lg md:text-xl font-black text-white capitalize">{activeView.replace('-', ' ')}</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-atlas-primary animate-pulse"></span>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Live Campus Analytics</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col text-right">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none mb-1">Today</p>
                    <p className="text-sm font-bold text-white leading-none">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-atlas-primary/10 border border-atlas-primary/20 text-atlas-primary cursor-pointer hover:bg-atlas-primary/20 transition-all">
                    <SparklesIcon className="h-5 w-5" />
                </div>
            </div>
        </header>

        {/* Scrollable View Content */}
        <div className="p-4 md:p-10 overflow-y-auto">
            {renderContent()}
        </div>

        {/* Ambiance Effects */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-atlas-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      </main>
    </div>
  );
};

export default InstituteDashboard;
