import React, { useEffect } from 'react';
import WithNavbar from './WithNavbar';
import { Link } from 'react-router-dom';
import NotFound from './NotFound';
import { connect } from 'react-redux';
import { setNoResults, setTrendingMovies, setTrendingTVShows, setGenres, setSelectedGenre, setSearchResults, setMovieDetails, setMovieCredits } from '../redux/Actions';
import { fetchMovieDetails, fetchMovieCredits } from '../redux/Actions'; 

const Home = ({ 
  searchTerm, 
  setNoResults, 
  setTrendingMovies, 
  setTrendingTVShows, 
  setGenres, 
  setSelectedGenre, 
  setSearchResults, 
  setMovieDetails, 
  setMovieCredits, 
  trendingMovies, 
  trendingTVShows, 
  genres, 
  selectedGenre, 
  noResults,
  dispatch 
}) => {
  
  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=1119df6b82c7089f8f9fa3e2208c4128'
      );
      const data = await response.json();
      setTrendingMovies(data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  const fetchTrendingTVShows = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/trending/tv/day?api_key=1119df6b82c7089f8f9fa3e2208c4128'
      );
      const data = await response.json();
      setTrendingTVShows(data.results);
    } catch (error) {
      console.error('Error fetching trending TV shows:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=1119df6b82c7089f8f9fa3e2208c4128'
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
    fetchTrendingTVShows();
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=1119df6b82c7089f8f9fa3e2208c4128&query=${searchTerm}`
        );
        const data = await response.json();

        if (data.results.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
          setTrendingMovies(data.results.filter((result) => result.media_type === 'movie'));
          setTrendingTVShows(data.results.filter((result) => result.media_type === 'tv'));
          setSelectedGenre(null);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchTerm) {
      fetchFilteredData();
      setGenres([]);
    } else {
      fetchTrendingMovies();
      fetchTrendingTVShows();
      fetchGenres();
      setSelectedGenre(null);
    }
  }, [searchTerm]);

  const filterMediaByGenre = async (genreId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=1119df6b82c7089f8f9fa3e2208c4128&with_genres=${genreId}`
      );
      const data = await response.json();
      setTrendingMovies(data.results);
      setSelectedGenre(genreId);
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
    }
  };

  const resetFilter = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=1119df6b82c7089f8f9fa3e2208c4128'
      );
      const data = await response.json();
      setTrendingMovies(data.results);
      setTrendingTVShows([]);
      setSelectedGenre(null);
      fetchGenres();
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

 
  const fetchDetails = (id) => {
    dispatch(fetchMovieDetails(id));
  };


  const fetchCredits = (id) => {
    dispatch(fetchMovieCredits(id));
  };

  return (
    <div className="container mx-auto my-8 text-center">
      {!searchTerm && (
        <div className="flex flex-wrap justify-center space-x-2 mb-4">
          <button
            className={`p-4 border rounded focus:outline-none ${!selectedGenre ? 'bg-gray-300 text-gray-800' : 'bg-gray-800 text-white'}`}
            onClick={resetFilter}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`p-4 border rounded focus:outline-none ${selectedGenre === genre.id ? 'bg-gray-300 text-gray-800' : 'bg-gray-800 text-white'}`}
              onClick={() => filterMediaByGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}

      {noResults && <NotFound />}

      {!noResults && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...trendingMovies, ...trendingTVShows].map((media) => (
            <Link key={media.id} to={`/detail/${media.id}`} className="card-link">
              <div className="bg-gray-800 top-20 h-full p-4 rounded-md hover:transform hover:scale-105 transition-all duration-300 card-container">
                <div className="h-70 overflow-hidden mb-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                    alt={media.title || media.name}
                    className="w-full h-full object-fill rounded-md"
                  />
                </div>
                <h2 className="text-white text-lg font-bold mb-2">{media.title || media.name}</h2>
                <p className="text-gray-400 text-center text-justify">{media.overview}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm,
  trendingMovies: state.trendingMovies,
  trendingTVShows: state.trendingTVShows,
  genres: state.genres,
  selectedGenre: state.selectedGenre,
  noResults: state.noResults
});

const mapDispatchToProps = {
  setNoResults,
  setTrendingMovies,
  setTrendingTVShows,
  setGenres,
  setSelectedGenre,
  setSearchResults,
  setMovieDetails, 
  setMovieCredits 
};

export default WithNavbar(connect(mapStateToProps, mapDispatchToProps)(Home));
