import axios from 'axios';
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from '../utils/constants';

// Cria instância do axios
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

// Buscar filmes (com filtro e paginação)
export const fetchMovies = async (sortBy = 'popularity.desc', page = 1) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        sort_by: sortBy,
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Buscar detalhes do filme (detalhes, créditos e vídeos)
export const fetchMovieDetails = async (movieId) => {
  try {
    const [movieDetails, credits, videos] = await Promise.all([
      api.get(`/movie/${movieId}`),
      api.get(`/movie/${movieId}/credits`),
      api.get(`/movie/${movieId}/videos`),
    ]);
    return {
      ...movieDetails.data,
      credits: credits.data,
      videos: videos.data,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Buscar filmes por nome
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Gerar URL de imagem
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export default api;