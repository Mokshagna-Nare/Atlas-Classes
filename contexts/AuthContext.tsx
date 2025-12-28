
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { createClient } from '@supabase/supabase-js';

// Configuration: Placeholder for future integration
const supabase = createClient(
  'https://YOUR_PROJECT_URL.supabase.co',
  'YOUR_ANON_KEY'
);

interface AuthContextType {
  user: User | null;
  login: (credentials: any, role: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from local storage on mount (Local Session)
  useEffect(() => {
    const savedUser = localStorage.getItem('atlas-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (credentials: any, role: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const { email, password } = credentials;

    // Dummy Credentials Logic
    let authenticatedUser: User | null = null;

    if (email === 'admin@atlas.com' && password === 'password' && (role === 'admin' || role === 'any')) {
      authenticatedUser = { id: 'admin-1', name: 'Global Administrator', role: 'admin' };
    } else if (email === 'institute@atlas.com' && password === 'password' && (role === 'institute' || role === 'any')) {
      authenticatedUser = { id: 'i1', name: 'ABC International School', role: 'institute' };
    } else if (email === 'student@atlas.com' && password === 'password' && (role === 'student' || role === 'any')) {
      authenticatedUser = { id: 's1', name: 'Riya Sharma', role: 'student', instituteId: 'i1' };
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('atlas-user', JSON.stringify(authenticatedUser));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      const err = `Invalid credentials for ${role} login. Use password 'password'.`;
      setError(err);
      throw new Error(err);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate successful signup
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('atlas-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
