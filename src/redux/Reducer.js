import { SET_SEARCH_TERM, SET_NO_RESULTS, SET_TRENDING_MOVIES, SET_TRENDING_TV_SHOWS, SET_GENRES, SET_SELECTED_GENRE, SET_SEARCH_RESULTS, SET_MOVIE_DETAILS, SET_MOVIE_CREDITS } from './ActionTypes';

const initialState = {
  searchTerm: '',
  noResults: false,
  trendingMovies: [],
  trendingTVShows: [],
  genres: [],
  selectedGenre: null,
  searchResults: [],
  movieDetails: null,
  movieCredits: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    case SET_NO_RESULTS:
      return {
        ...state,
        noResults: action.payload
      };
    case SET_TRENDING_MOVIES:
      return {
        ...state,
        trendingMovies: action.payload
      };
    case SET_TRENDING_TV_SHOWS:
      return {
        ...state,
        trendingTVShows: action.payload
      };
    case SET_GENRES:
      return {
        ...state,
        genres: action.payload
      };
    case SET_SELECTED_GENRE:
      return {
        ...state,
        selectedGenre: action.payload
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };
    case SET_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload
      };
    case SET_MOVIE_CREDITS:
      return {
        ...state,
        movieCredits: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
