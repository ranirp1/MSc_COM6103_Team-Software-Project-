import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  backgroundColor: string;
}

const Navigation: React.FC<NavigationProps> = ({ backgroundColor }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const navigateTo = (path: string) => {
    navigate(path);
    setShowMenu(false); // Close the menu after navigation
  };

  return (
    <div className={`absolute top-0 left-0 p-4 z-10 w-full ${backgroundColor}`}>
      {/* Navigation Menu */}
      <div className="relative">
        <button 
          onClick={() => setShowMenu(!showMenu)} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span>&#8801;</span> {/* Hamburger menu Unicode */}
        </button>
        {showMenu && (
          <div className="absolute left-0 mt-10 w-48 origin-top-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a 
                href="#" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                onClick={() => navigateTo("/")}
              >
                Home
              </a>
              <a 
                href="#" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                onClick={() => navigateTo("/register")}
              >
                Register
              </a>
              <a 
                href="#" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                onClick={() => navigateTo("/login")}
              >
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
