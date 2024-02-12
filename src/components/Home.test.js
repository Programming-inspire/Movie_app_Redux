import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

describe('fetchTrendingMovies', () => {
  it('should fetch and set trending movies', async () => {
    const mockData = {
      results: [
        { id: 609681, title: 'The Marvels' },
        { id: 1072790, title: 'Anyone But You' },
        { id: 1056360, title: 'American Fiction' },
        { id: 866398, title: 'The Beekeeper' }
      ]
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });

    const setTrendingMovies = jest.fn();

    await Home.prototype.fetchTrendingMovies(setTrendingMovies);

    expect(fetch).toHaveBeenCalledWith('https://api.themoviedb.org/3/trending/movie/day?api_key=1119df6b82c7089f8f9fa3e2208c4128');
    expect(setTrendingMovies).toHaveBeenCalledWith(mockData.results);
  });

  it('should handle errors gracefully', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));

    console.error = jest.fn();

    const setTrendingMovies = jest.fn();

    await Home.prototype.fetchTrendingMovies(setTrendingMovies);

    expect(fetch).toHaveBeenCalledWith('https://api.themoviedb.org/3/trending/movie/day?api_key=1119df6b82c7089f8f9fa3e2208c4128');
    expect(console.error).toHaveBeenCalledWith('Error fetching trending movies:', new Error('Failed to fetch'));
  });
});
