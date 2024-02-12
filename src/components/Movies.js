// Movies.js
import React, { useState, useEffect } from 'react';
import WithNavbar from './WithNavbar';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=1119df6b82c7089f8f9fa3e2208c4128'
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-gray-800 p-4 rounded-md">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-contain rounded-md mb-4"
          />
          <h2 className="text-white text-lg font-bold mb-2">{movie.original_title}</h2>
          <p className="text-gray-400">{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};

export default WithNavbar(Movies);

