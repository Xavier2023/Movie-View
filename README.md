HOW TO SETUP THIS WEBSITE:
1.  Clone the repository on your local machine.
2.  Run 'npm install' on your VSCODE Terminal to intall necessary dependencies
3.  create your own .env.local where you can store yoour API Key. getting the api key will be explained below

FEATURES
1. Search for different movies and series using the search bar


 API SETUP
 1. Get an API Key

Sign up for an account on the OMDb API website (http://www.omdbapi.com/).
You'll receive a free API key that you can use for non-commercial purposes.
2. Understand the API Endpoints

The primary endpoint for searching movies is: http://www.omdbapi.com/
You'll need to include your API key and search parameters in the request.
3. Make API Requests

Use a library like fetch or axios to make HTTP requests to the API.
Here's an example using fetch to search for movies with the title "Batman":

fetch(`http://www.omdbapi.com/?s=Batman&apikey=your_api_key`)
  .then(response => response.json())
  .then(data => {
    // Process the movie data here
    console.log(data);
  })
  .catch(error => {
    // Handle errors here
    console.error('Error fetching movies:', error);
  });
Search Parameters

s: Search by movie title (e.g., s=Batman).
i: Search by IMDb ID (e.g., i=tt0088228).
t: Search by exact movie title (e.g., t=The Dark Knight).
y: Filter by release year (e.g., y=2008).
type: Filter by type (movie, series, episode) (e.g., type=movie).
page: For pagination (e.g., page=2).
5. Handle API Responses

The API returns data in JSON format.   
Parse the JSON response to extract the movie information you need.
The response will include an array of movies (if multiple results) or a single movie object.
Each movie object contains details like title, year, poster, plot, rating, etc.   
6. Display Movie Data

Use the extracted movie data to dynamically render movie cards or lists on your website.
Display movie posters, titles, ratings, and other relevant information.   
Consider using a library like React or Vue.js to efficiently manage and update the UI.
7. Implement Search Functionality

Create a search bar where users can enter movie titles.
Use JavaScript to capture user input and trigger API requests based on the search query.
Update the displayed movie results based on the API response.
8. Pagination (Optional)

If the API response includes multiple pages of results, implement pagination to allow users to browse through all the movies.
9. Error Handling

Implement error handling to gracefully handle cases where the API request fails or returns unexpected data.
Display appropriate error messages to the user.
10. Security

Protect your API key: Don't hardcode your API key directly in your client-side code. Use environment variables or server-side logic to keep it secure.
Rate limiting: Be aware of the API's rate limits to avoid getting blocked.
