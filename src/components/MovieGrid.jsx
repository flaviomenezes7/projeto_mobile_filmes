// src/components/MovieGrid.jsx
import React from 'react';
import MovieCard from './MovieCard';
import { useMoviesContext } from '../contexts/MoviesContext';
import Loader from './Loader';

const MovieGrid = () => {
  const { movies, loading, error, loadMoreMovies, page, totalPages } = useMoviesContext();

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {movies.length === 0 && !loading ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No movies found. Try different search criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map(movie => (
              <div key={movie.id} className="h-full">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
          
          {page < totalPages && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMoreMovies}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}

          {loading && (
            <div className="mt-8">
              <Loader />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieGrid;