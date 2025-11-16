
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
}

const Dropdown: React.FC<DropdownProps> = ({ buttonText, children, buttonClassName }) => {
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
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center py-2 px-4 rounded-md transition-all duration-300 ease-in-out ${buttonClassName}`}
            >
                {buttonText}
                <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-atlas-gray rounded-md shadow-lg py-1 z-10 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
                    {children}
                </div>
            )}
        </div>
    );
};


const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavClick = (href: string) => {
        if (href === 'home') {
            window.location.hash = '';
            window.location.reload();
        } else {
            scrollToSection(href);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-atlas-black/80 backdrop-blur-sm shadow-md transition-all duration-300">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="text-2xl font-bold text-atlas-orange cursor-pointer" onClick={() => handleNavClick('home')}>
                    Atlas<span className="text-white">Classes</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavClick(link.href)}
                            className={`text-gray-300 hover:text-atlas-orange transition-colors relative font-medium ${
                                activeSection === link.href ? 'text-atlas-orange' : ''
                            }`}
                        >
                            {link.name}
                            {activeSection === link.href && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-atlas-orange"></span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    <Dropdown
                        buttonText="Login"
                        buttonClassName="font-semibold text-gray-300 border border-gray-700 hover:text-white hover:border-atlas-orange hover:bg-atlas-orange/10"
                    >
                       <Link to="/login/student" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-atlas-black hover:text-atlas-orange">Student Login</Link>
                       <Link to="/login/institute" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-atlas-black hover:text-atlas-orange">Institute Login</Link>
                       <Link to="/login/admin" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-atlas-black hover:text-atlas-orange">Admin Login</Link>
                    </Dropdown>
                    <Dropdown
                        buttonText="Sign Up"
                        buttonClassName="font-bold bg-atlas-orange text-white hover:bg-orange-600 transform hover:scale-105"
                    >
                       <Link to="/signup/student" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-atlas-black hover:text-atlas-orange">Student Signup</Link>
                       <Link to="/signup/institute" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-atlas-black hover:text-atlas-orange">Institute Signup</Link>
                    </Dropdown>
                </div>
                
                {/* Mobile Nav Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="md:hidden bg-atlas-black">
                    <nav className="px-6 pt-2 pb-4 space-y-2 flex flex-col">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => {
                                    handleNavClick(link.href)
                                    setIsOpen(false);
                                }}
                                className={`block text-left py-2 text-gray-300 hover:text-atlas-orange transition-colors ${
                                    activeSection === link.href ? 'text-atlas-orange' : ''
                                }`}
                            >
                                {link.name}
                            </button>
                        ))}
                         <div className="border-t border-gray-700 pt-4 mt-2 space-y-2">
                             <p className="px-2 text-sm font-semibold text-gray-500">PORTALS</p>
                             <Link to="/login/student" onClick={() => setIsOpen(false)} className="block text-left py-2 px-2 text-gray-300 hover:text-atlas-orange rounded-md transition-colors">
                                Student Login
                            </Link>
                             <Link to="/login/institute" onClick={() => setIsOpen(false)} className="block text-left py-2 px-2 text-gray-300 hover:text-atlas-orange rounded-md transition-colors">
                                Institute Login
                            </Link>
                            <Link to="/login/admin" onClick={() => setIsOpen(false)} className="block text-left py-2 px-2 text-gray-300 hover:text-atlas-orange rounded-md transition-colors">
                                Admin Login
                            </Link>
                             <Link to="/signup/student" onClick={() => setIsOpen(false)} className="block text-left py-2 px-2 text-gray-300 hover:text-atlas-orange rounded-md transition-colors">
                                Student Signup
                            </Link>
                             <Link to="/signup/institute" onClick={() => setIsOpen(false)} className="block text-left py-2 px-2 text-gray-300 hover:text-atlas-orange rounded-md transition-colors">
                                Institute Signup
                            </Link>
                         </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;