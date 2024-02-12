import React, { useState, useEffect } from 'react';
import WithNavbar from './WithNavbar';


const TV = () => {
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/tv?api_key=1119df6b82c7089f8f9fa3e2208c4128'
        );
        const data = await response.json();
        setTVShows(data.results);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchTVShows();
  }, []);

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {tvShows.map((show) => (
        <div key={show.id} className="bg-gray-800 p-4 rounded-md">
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <h2 className="text-white text-lg font-bold mb-2">{show.original_name}</h2>
          <p className="text-gray-400">{show.overview}</p>
        </div>
      ))}
    </div>
  );
};

export default WithNavbar(TV);