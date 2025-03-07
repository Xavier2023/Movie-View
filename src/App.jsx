import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [movieArray, setMovieArray] = useState([]);
  const [searchValue, setSearchValue] = useState({
    movieSearch: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getMovies = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const movieName = searchValue.movieSearch;
    if (!movieName) return;

    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found in .env');
      }

      const res = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`);
      const data = await res.json();

      if (data.Search && data.Response !== 'False') {
        const completeSearch = await Promise.all(
          data.Search.map(async (movieData) => {
            const response = await fetch(`https://www.omdbapi.com/?i=${movieData.imdbID}&apikey=${apiKey}`);
            return response.json();
          })
        );
        setMovieArray(completeSearch);
      } else {
        setMovieArray([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovieArray([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav id="nav-bar">
        <h1>Find your film </h1>
      </nav>
      <section id="search-section">
        <form onSubmit={getMovies}>
          <label>
            <i className="fas fa-search"></i>
          </label>
          <input
            type="search"
            id="movie-search"
            name="movieSearch"
            placeholder="Search for a movie"
            value={searchValue.movieSearch}
            onChange={handleChange}
          />
          <button id="search" type="submit">
            Search
          </button>
        </form>
      </section>
      <section id="movie-list">
        {isLoading ? (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading...</p>
          </div>
        ) : movieArray.length !== 0 ? (
          movieArray.map((movie) => (
            <section className="movies" key={movie.imdbID}>
              <div className="movie-list">
                <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
                <div id="movie-info">
                  <h2 id="movie-title">
                    {movie.Title} <span><i className="fas fa-star"></i> {movie.imdbRating} {movie.Type}</span>
                  </h2>
                  <div id="about">
                    <p>{movie.Year}</p>
                    <p id="run-time">{movie.Runtime}</p>
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div id="movie-icon">
            <i className="fas fa-film movie-icon"></i>
            <p>Start exploring</p>
          </div>
        )}
      </section>
    </>
  );
};

export default App;