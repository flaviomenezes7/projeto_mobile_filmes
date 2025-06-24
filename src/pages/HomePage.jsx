// src/pages/HomePage.jsx
import React from 'react';
import FilterOptions from '../components/FilterOptions';
import MovieGrid from '../components/MovieGrid';
import { useMoviesContext } from '../contexts/MoviesContext';

const HomePage = () => {
  const { searchQuery } = useMoviesContext();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {!searchQuery && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Filmes em Cartaz</h1>
            <FilterOptions />
          </>
        )}
        {searchQuery && (
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Resultados para: <span className="text-blue-600">"{searchQuery}"</span>
          </h1>
        )}
        <MovieGrid />
      </div>
    </div>
  );
};

export default HomePage;