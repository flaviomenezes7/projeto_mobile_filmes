// src/contexts/MoviesContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchMovies, fetchMovieDetails, searchMovies } from '../services/api';

const MoviesContext = createContext();

export const useMoviesContext = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getMovies = async (filter = currentFilter, pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies(filter, pageNum);
      setMovies(data.results);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDb API limits to 500 pages max
      setPage(pageNum);
      setCurrentFilter(filter);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMovieDetails = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError('Failed to fetch movie details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(query, 1);
        setMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        setPage(1);
      } catch (err) {
        setError('Failed to search movies. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      // If search query is cleared, fetch popular movies
      getMovies('popularity.desc', 1);
    }
  };

  const loadMoreMovies = async () => {
    if (page < totalPages) {
      setLoading(true);
      try {
        const nextPage = page + 1;
        const data = searchQuery
          ? await searchMovies(searchQuery, nextPage)
          : await fetchMovies(currentFilter, nextPage);
        
        setMovies([...movies, ...data.results]);
        setPage(nextPage);
      } catch (err) {
        setError('Failed to load more movies. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const clearMovieDetails = () => {
    setMovie(null);
  };

  // Fetch initial popular movies on component mount
  useEffect(() => {
    getMovies('popularity.desc', 1);
  }, []);

  return (
    <MoviesContext.Provider value={{
      movies,
      movie,
      loading,
      error,
      searchQuery,
      currentFilter,
      page,
      totalPages,
      getMovies,
      getMovieDetails,
      handleSearch,
      loadMoreMovies,
      clearMovieDetails,
    }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
