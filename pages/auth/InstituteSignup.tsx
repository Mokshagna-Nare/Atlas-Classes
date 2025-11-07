import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const InstituteSignup: React.FC = () => {
  const [instituteName, setInstituteName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Mock signup logic
    console.log('Signing up institute:', { instituteName, email, password });
    auth?.login({ id: 'i_new', name: instituteName, role: 'institute' });
    navigate('/dashboard/institute');
  };

  return (
    <div className="min-h-screen bg-atlas-black flex items-center justify-center">
      <div className="bg-atlas-gray p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-atlas-orange mb-6">Institute Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-2">Institute Name</label>
            <input
              type="text"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              className="w-full p-3 bg-atlas-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange"
              placeholder="e.g., ABC School"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-atlas-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange"
              placeholder="e.g., admin@abcschool.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-atlas-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange"
              placeholder="••••••••"
              required
            />
          </div>
           <div>
            <label className="text-sm font-bold text-gray-300 block mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-atlas-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-atlas-orange"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-atlas-orange text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300">
            Register Institute
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4 text-sm">
            Already registered? <Link to="/login/institute" className="text-atlas-orange hover:underline">Login here</Link>
        </p>
         <p className="text-center text-gray-400 mt-2 text-sm">
            Go back to <Link to="/" className="text-atlas-orange hover:underline">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default InstituteSignup;