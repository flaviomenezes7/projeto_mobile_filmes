// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useMoviesContext } from '../contexts/MoviesContext';

const Navbar = () => {
  const { handleSearch } = useMoviesContext();

  return (
    <nav className="bg-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-white mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2H5v-2h10zM7 11h2v2H7v-2zm4 0h2v2h-2v-2z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-xl text-white">MovieApp</span>
            </Link>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <div className="w-full max-w-xs md:max-w-md lg:max-w-lg mr-4">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;