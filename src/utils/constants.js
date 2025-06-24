
export const API_KEY = 'b8e16ff25f44004fe2ab5dedc9e0453e'; // deixei a API aberta para testes. mas sei que não é uma boa prática expor a chave da API em produção. 
// Considere usar variáveis de ambiente ou outro método seguro para armazenar chaves de API.
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const SORT_OPTIONS = {
  POPULARITY: 'popularity.desc',
  RATING: 'vote_average.desc',
  RELEASE_DATE: 'primary_release_date.desc',
  REVENUE: 'revenue.desc',
};