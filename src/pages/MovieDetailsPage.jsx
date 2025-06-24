// src/pages/MovieDetailsPage.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMoviesContext } from '../contexts/MoviesContext';
import { getImageUrl } from '../services/api';
import Loader from '../components/Loader';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { movie, loading, error, getMovieDetails, clearMovieDetails } = useMoviesContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    getMovieDetails(id);
    
    return () => clearMovieDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>;
  if (!movie) return null;

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('pt-BR') : 'Data desconhecida';
  
  // Get trailer if available
  const trailer = movie.videos?.results?.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  // Get up to 10 cast members
  const cast = movie.credits?.cast?.slice(0, 10) || [];
  
  // Get director
  const director = movie.credits?.crew?.find(
    (crewMember) => crewMember.job === 'Director'
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Backdrop Image */}
      <div 
        className="w-full h-96 bg-cover bg-center relative"
        style={{
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
          backgroundColor: !backdropUrl ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="my-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar para a lista de filmes
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden -mt-32 relative z-10">
          <div className="md:flex">
            {/* Movie Poster */}
            <div className="md:w-1/3 flex-shrink-0">
              {posterUrl ? (
                <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
              ) : (
                <div className="w-full h-full min-h-[400px] bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800">No Image Available</span>
                </div>
              )}
            </div>
            
            {/* Movie Info */}
            <div className="p-6 md:w-2/3">
              <div className="flex flex-wrap items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{movie.title}</h1>
                <div className="flex items-center bg-blue-600 text-white font-bold rounded-full px-3 py-1 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {movie.vote_average?.toFixed(1) || 'N/A'}
                </div>
              </div>
              
              {movie.tagline && (
                <p className="text-gray-600 italic mb-4">"{movie.tagline}"</p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {genre.name}
                  </span>
                ))}
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Sinopse</h2>
                <p className="text-gray-700">
                  {movie.overview || 'Sinopse não disponível.'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">Data de Lançamento</h3>
                  <p className="text-gray-600">{releaseDate}</p>
                </div>
                
                {movie.runtime && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">Duração</h3>
                    <p className="text-gray-600">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</p>
                  </div>
                )}
                
                {director && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">Direção</h3>
                    <p className="text-gray-600">{director.name}</p>
                  </div>
                )}
                
                {movie.production_companies?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">Produção</h3>
                    <p className="text-gray-600">
                      {movie.production_companies.slice(0, 2).map(company => company.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Trailer Section */}
              {trailer && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Trailer</h2>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      src={`https://www.youtube.com/embed/${trailer.key}`} 
                      title="YouTube video player" 
                      className="w-full h-64 md:h-72" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Cast Section */}
          {cast.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Elenco Principal</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cast.map((person) => (
                  <div key={person.id} className="text-center">
                    {person.profile_path ? (
                      <img 
                        src={getImageUrl(person.profile_path, 'w185')} 
                        alt={person.name} 
                        className="w-24 h-24 object-cover object-center mx-auto rounded-full mb-2"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-800 text-xl font-bold">
                          {person.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <p className="text-sm font-semibold text-gray-800">{person.name}</p>
                    <p className="text-xs text-gray-600">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;