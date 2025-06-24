// src/components/FilterOptions.jsx
import React from 'react';
import { useMoviesContext } from '../contexts/MoviesContext';

const FilterOptions = () => {
  const { getMovies, currentFilter } = useMoviesContext();

  const filters = [
    { value: 'popularity.desc', label: 'Mais Populares' },
    { value: 'vote_average.desc', label: 'Melhor Avaliados' },
    { value: 'primary_release_date.desc', label: 'Recém Lançados' },
    { value: 'revenue.desc', label: 'Maior Bilheteria' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => getMovies(filter.value, 1)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            currentFilter === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterOptions;