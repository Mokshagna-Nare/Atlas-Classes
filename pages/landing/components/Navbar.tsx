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
                className={`flex items-center py-2 px-5 rounded-full transition-all duration-300 ease-in-out ripple ${buttonClassName}`}
            >
                {buttonText}
                <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-atlas-soft/95 backdrop-blur-xl rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-gray-700/50 py-2 z-20 animate-scale-in origin-top-right overflow-hidden">
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
                ? 'bg-atlas-dark/80 backdrop-blur-lg shadow-lg border-gray-800 py-2' 
                : 'bg-transparent border-transparent py-4'
            }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="cursor-pointer flex items-center transform transition-transform duration-300 hover:scale-105" onClick={() => handleNavClick('home')}>
                    <img 
                        src="https://i.postimg.cc/xdCpx0Kj/Logo-new-(1).png" 
                        alt="Atlas Classes" 
                        className="h-16 md:h-16 w-auto object-contain" 
                    />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-1 bg-atlas-soft/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavClick(link.href)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeSection === link.href 
                                ? 'text-white bg-atlas-primary/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </nav>

                <div className="hidden md:flex items-center space-x-3">
                    <Dropdown
                        buttonText="Login"
                        buttonClassName="font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-gray-600"
                    >
                       <Link to="/login/student" className="block w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-atlas-primary/10 hover:text-atlas-primary transition-colors">Student Login</Link>
                       <Link to="/login/institute" className="block w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-atlas-primary/10 hover:text-atlas-primary transition-colors">Institute Login</Link>
                       <Link to="/login/admin" className="block w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-atlas-primary/10 hover:text-atlas-primary transition-colors">Admin Login</Link>
                    </Dropdown>
                    <Dropdown
                        buttonText="Sign Up"
                        buttonClassName="font-bold bg-atlas-primary text-white hover:bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] border border-atlas-primary"
                    >
                       <Link to="/signup/student" className="block w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-atlas-primary/10 hover:text-atlas-primary transition-colors">Student Signup</Link>
                       <Link to="/signup/institute" className="block w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-atlas-primary/10 hover:text-atlas-primary transition-colors">Institute Signup</Link>
                    </Dropdown>
                </div>
                
                {/* Mobile Nav Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none hover:text-atlas-primary p-2 rounded-md hover:bg-white/5 transition-colors">
                        {isOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="md:hidden bg-atlas-dark/95 backdrop-blur-xl border-t border-gray-800 absolute top-full left-0 right-0 h-screen overflow-y-auto">
                    <nav className="px-6 py-8 space-y-2 flex flex-col">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => {
                                    handleNavClick(link.href)
                                    setIsOpen(false);
                                }}
                                className={`block text-left py-4 text-xl font-medium border-b border-gray-800/50 transition-colors ${
                                    activeSection === link.href ? 'text-atlas-primary' : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                {link.name}
                            </button>
                        ))}
                         <div className="pt-8 space-y-4">
                             <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Account Access</p>
                             <Link to="/login/student" onClick={() => setIsOpen(false)} className="block w-full text-center py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700">Student Login</Link>
                             <Link to="/signup/student" onClick={() => setIsOpen(false)} className="block w-full text-center py-4 bg-atlas-primary text-white rounded-lg font-bold shadow-lg hover:bg-emerald-600 transition-colors ripple">Get Started</Link>
                         </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;