import { SET_SEARCH_TERM, SET_NO_RESULTS, SET_TRENDING_MOVIES, SET_TRENDING_TV_SHOWS, SET_GENRES, SET_SELECTED_GENRE, SET_SEARCH_RESULTS, SET_MOVIE_DETAILS, SET_MOVIE_CREDITS } from './ActionTypes';

export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term
});

export const setNoResults = (noResults) => ({
  type: SET_NO_RESULTS,
  payload: noResults
});

export const setTrendingMovies = (movies) => ({
  type: SET_TRENDING_MOVIES,
  payload: movies
});

export const setTrendingTVShows = (tvShows) => ({
  type: SET_TRENDING_TV_SHOWS,
  payload: tvShows
});

export const setGenres = (genres) => ({
  type: SET_GENRES,
  payload: genres
});

export const setSelectedGenre = (genre) => ({
  type: SET_SELECTED_GENRE,
  payload: genre
});

export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results
});

export const setMovieDetails = (details) => ({
  type: SET_MOVIE_DETAILS,
  payload: details
});

export const setMovieCredits = (credits) => ({
  type: SET_MOVIE_CREDITS,
  payload: credits
});

// Thunk action creators for fetching movie details and credits
export const fetchMovieDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1119df6b82c7089f8f9fa3e2208c4128`);
      const data = await response.json();
      dispatch(setMovieDetails(data));
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };
};

export const fetchMovieCredits = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=1119df6b82c7089f8f9fa3e2208c4128`);
      const data = await response.json();
      dispatch(setMovieCredits(data));
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };
};
