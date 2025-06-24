// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MoviesProvider } from './contexts/MoviesContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';

function App() {
  return (
    <MoviesProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
            </Routes>
          </main>
          <footer className="bg-blue-800 text-white py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm">
                    &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    Data provided by{' '}
                    <a
                      href="https://www.themoviedb.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white underline"
                    >
                      TMDb
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </MoviesProvider>
  );
}

export default App;