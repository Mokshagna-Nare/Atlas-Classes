
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../../constants';
import { MenuIcon, XIcon, ChevronDownIcon } from '../../../components/icons';

interface NavbarProps {
    activeSection: string;
    scrollToSection: (id: string) => void;
}

interface DropdownProps {
    buttonText: string;
    children: React.ReactNode;
    buttonClassName?: string;
    active?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ buttonText, children, buttonClassName, active }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative group" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center transition-all duration-300 ease-in-out ${buttonClassName}`}
            >
                {buttonText}
                <ChevronDownIcon className={`h-3.5 w-3.5 ml-1.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-atlas-soft/95 backdrop-blur-2xl rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-white/10 py-2 z-20 animate-scale-in origin-top-right overflow-hidden ring-1 ring-white/5">
                    {children}
                </div>
            )}
        </div>
    );
};


const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleNavClick = (href: string) => {
        if (href === 'home') {
            window.location.hash = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            scrollToSection(href);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
                isScrolled 
                ? 'bg-atlas-dark/80 backdrop-blur-xl shadow-lg shadow-black/50 border-white/5 py-3' 
                : 'bg-transparent border-transparent py-6'
            }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="cursor-pointer flex items-center transform transition-transform duration-300 hover:scale-105" onClick={() => handleNavClick('home')}>
                    <img 
                        src="https://i.postimg.cc/xdCpx0Kj/Logo-new-(1).png" 
                        alt="Atlas Classes" 
                        className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
                    />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-1 bg-atlas-soft/40 backdrop-blur-2xl px-2 py-1.5 rounded-full border border-white/10 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)]">
                    {NAV_LINKS.map((link) => {
                         const isActive = activeSection === link.href;
                         return (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.href)}
                                className={`relative px-5 py-2 rounded-full text-sm transition-all duration-300 font-medium overflow-hidden group ${
                                    isActive 
                                    ? 'text-white bg-atlas-primary/15 border border-atlas-primary/40 shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                            >
                                <span className="relative z-10">{link.name}</span>
                                {/* Subtle active inner highlight */}
                                {isActive && (
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    <Dropdown
                        buttonText="Login"
                        buttonClassName="text-sm font-semibold text-gray-400 hover:text-white transition-colors px-3 py-2 hover:bg-white/5 rounded-lg"
                    >
                       <Link to="/login/student" className="block w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-atlas-primary/10 hover:text-atlas-primary transition-colors border-l-2 border-transparent hover:border-atlas-primary">Student Login</Link>
                       <Link to="/login/institute" className="block w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-atlas-primary/10 hover:text-atlas-primary transition-colors border-l-2 border-transparent hover:border-atlas-primary">Institute Login</Link>
                       <Link to="/login/admin" className="block w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-atlas-primary/10 hover:text-atlas-primary transition-colors border-l-2 border-transparent hover:border-atlas-primary">Admin Login</Link>
                    </Dropdown>
                    <Dropdown
                        buttonText="Sign Up"
                        buttonClassName="text-sm font-bold bg-atlas-primary text-white px-6 py-2.5 rounded-full shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.8)] hover:bg-emerald-500 transition-all duration-300 border border-emerald-400/30 hover:-translate-y-0.5"
                    >
                       <Link to="/signup/student" className="block w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-atlas-primary/10 hover:text-atlas-primary transition-colors border-l-2 border-transparent hover:border-atlas-primary">Student Signup</Link>
                       <Link to="/signup/institute" className="block w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-atlas-primary/10 hover:text-atlas-primary transition-colors border-l-2 border-transparent hover:border-atlas-primary">Institute Signup</Link>
                    </Dropdown>
                </div>
                
                {/* Mobile Nav Toggle */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="text-gray-300 focus:outline-none hover:text-atlas-primary p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                    >
                        {isOpen ? <XIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="md:hidden bg-atlas-dark/95 backdrop-blur-2xl border-t border-white/10 absolute top-full left-0 right-0 h-[calc(100vh-80px)] overflow-y-auto animate-fade-in-up">
                    <nav className="px-6 py-8 space-y-1 flex flex-col">
                        {NAV_LINKS.map((link) => {
                            const isActive = activeSection === link.href;
                            return (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        handleNavClick(link.href)
                                        setIsOpen(false);
                                    }}
                                    className={`block text-left px-4 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                                        isActive 
                                        ? 'text-atlas-primary bg-atlas-primary/10 border border-atlas-primary/20 shadow-[inset_0_0_15px_rgba(16,185,129,0.05)]' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                                >
                                    {link.name}
                                </button>
                            );
                        })}
                         <div className="pt-8 space-y-4 px-2">
                             <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>
                             <p className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Account Access</p>
                             <div className="grid grid-cols-2 gap-4">
                                <Link to="/login/student" onClick={() => setIsOpen(false)} className="text-center py-3 bg-gray-800/50 text-gray-200 rounded-lg font-semibold hover:bg-gray-800 transition-colors border border-white/5 hover:border-gray-600">Login</Link>
                                <Link to="/signup/student" onClick={() => setIsOpen(false)} className="text-center py-3 bg-atlas-primary text-white rounded-lg font-bold shadow-lg shadow-emerald-900/50 hover:bg-emerald-600 transition-colors">Sign Up</Link>
                             </div>
                         </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
