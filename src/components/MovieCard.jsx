
import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';

const MovieCard = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path);
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  
  
  const getRatingColor = (rating) => {
    if (rating >= 7) return 'bg-green-500';
    if (rating >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="relative">
          {posterUrl ? (
            <img 
              src={posterUrl}
              alt={movie.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-64 bg-blue-200 flex items-center justify-center">
              <span className="text-blue-800">No Image Available</span>
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <div className={`${getRatingColor(movie.vote_average)} text-white text-xs font-bold py-1 px-2 rounded-full`}>
              {movie.vote_average?.toFixed(1) || 'N/A'}
            </div>
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{releaseYear}</p>
          <p className="text-sm text-gray-700 line-clamp-3 flex-1">{movie.overview || 'No overview available.'}</p>
          <div className="mt-3 text-blue-600 text-sm font-medium flex items-center group-hover:text-blue-800">
            Ver detalhes
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;