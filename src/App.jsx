import React, { useState } from 'react';
import './App.css';

const App = () => {
  // State variables to manage the movie data, search input, and loading state
  const [movieArray, setMovieArray] = useState(); // Array to store fetched movie data
  const [searchValue, setSearchValue] = useState({
    movieSearch: '', // Object to store the current search value
  });
  const [isLoading, setIsLoading] = useState(false); // Boolean to indicate if data is being fetched

  // Function to handle changes in the search input field
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract the name and value from the input field
    setSearchValue((prev) => ({
      ...prev, // Keep the previous state
      [name]: value, // Update the state with the new value
    }));
  };

  // Function to fetch movie data from the OMDb API
  const getMovies = async (e) => {
    if (e) {
      e.preventDefault(); // Prevent default form submission behavior
    }
    const movieName = searchValue.movieSearch; // Get the movie name from the search state
    if (!movieName) return; // If no movie name is provided, exit the function

    setIsLoading(true); // Set loading state to true before fetching data

    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY; // Access API key from environment variables
      if (!apiKey) {
        throw new Error('API key not found in .env'); // Throw an error if the API key is not found
      }

      // Fetch initial movie data based on the search term
      const res = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`);
      const data = await res.json(); // Parse the response as JSON

      if (data.Search && data.Response !== 'False') {
        // If movies are found, fetch detailed information for each movie
        const completeSearch = await Promise.all(
          data.Search.map(async (movieData) => {
            const response = await fetch(`https://www.omdbapi.com/?i=${movieData.imdbID}&apikey=${apiKey}`);
            return response.json(); // Parse the response as JSON
          })
        );
        setMovieArray(completeSearch); // Update the movie array with the fetched data
      } else {
        setMovieArray(); // If no movies are found, clear the movie array
      }
    } catch (error) {
      console.error('Error fetching movies:', error); // Log any errors that occur during fetching
      setMovieArray(); // Clear the movie array in case of an error
    } finally {
      setIsLoading(false); // Set loading state to false after fetching is complete
    }
  };

  return (
    <>
      <nav id="nav-bar">
        <h1>Find your film </h1> {/* Heading for the navigation bar */}
      </nav>
      <section id="search-section">
        <form onSubmit={getMovies}> {/* Form for submitting movie searches */}
          <label>
            <i className="fas fa-search"></i> {/* Search icon */}
          </label>
          <input
            type="search"
            id="movie-search"
            name="movieSearch"
            placeholder="Search for a movie"
            value={searchValue.movieSearch} // Bind the input value to the search state
            onChange={handleChange} // Call handleChange function when the input value changes
          />
          <button id="search" type="submit">
            Search {/* Button to submit the search */}
          </button>
        </form>
      </section>
      <section id="movie-list">
        {isLoading ? ( // Conditionally render loading indicator or movie list
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i> {/* Loading spinner icon */}
            <p>Loading...</p> {/* Loading text */}
          </div>
        ) : movieArray.length !== 0 ? ( // If movies are available, render the movie list
          movieArray.map((movie) => ( // Map over the movie array to render individual movie items
            <section className="movies" key={movie.imdbID}> {/* Section for each movie item */}
              <div className="movie-list">
                <img className="movie-poster" src={movie.Poster} alt={movie.Title} /> {/* Movie poster image */}
                <div id="movie-info">
                  <h2 id="movie-title">
                    {movie.Title} <span><i className="fas fa-star"></i> {movie.imdbRating} {movie.Type}</span> {/* Movie title and rating */}
                  </h2>
                  <div id="about">
                    <p>{movie.Year}</p> {/* Movie release year */}
                    <p id="run-time">{movie.Runtime}</p> {/* Movie runtime */}
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div id="movie-icon"> {/* If no movies are found, display a message */}
            <i className="fas fa-film movie-icon"></i> {/* Movie icon */}
            <p>Start exploring</p> {/* Message to encourage searching */}
          </div>
        )}
      </section>
    </>
  );
};

export default App;