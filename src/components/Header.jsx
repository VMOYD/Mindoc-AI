// components/Header.jsx
import React from 'react';
import { Menu, User } from 'lucide-react';

const Header = ({ isAuthenticated, onSignInClick }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 border-b border-blue-500/30">
      <div className="flex items-center">
        {/* <Menu className="h-6 w-6 text-blue-400" /> */}
        <h1 className="ml-3 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Mindoc AI
        </h1>
      </div>
      <div className="flex items-center">
        {isAuthenticated ? (
          <div className="flex items-center bg-gray-700 rounded-full p-1 pr-4 cursor-pointer hover:bg-gray-600 transition-colors">
            <div className="bg-blue-500 rounded-full p-1 mr-2">
              <User className="h-5 w-5 text-gray-900" />
            </div>
            <span className="text-sm">User Profile</span>
          </div>
        ) : (
          <button 
            onClick={onSignInClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;