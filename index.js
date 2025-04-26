const cardTemplate = function (country) {
  return `<div class="card">
              <img id="flag-image" src="${country.flags.png}" alt="flag" />
              <h1 class="center">${country.name.common}</h1>
            </div>`;
};

const countriesNode = document.getElementById("countries");

// fetch('https://restcountries.com/v3.1/all')
//   .then(function (response) {
//     // fetch() returns a promise containing the response (a Response object).
//     // This is just an HTTP response, not the actual JSON. 
//     // To extract the JSON body content from the response, 
//     // we use the json() method and pass it into the next .then()
//   })
//   .then(function (countries) {
//     // Here is where you'll need to add into the DOM all the countries received from API 
//     // 1 - We will need to iterate the countries variable with a loop
//     // 2 - You can use the cardTemplate() function to create a div with a class card already styled
//     // 💡 you can use countriesNode variable to add elements
//   });


const getCountriesData = async () => {
  const url = 'https://restcountries.com/v3.1/all';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error((`Response status: ${response.status}`));
    }

    const countries = await response.json();
    console.log(countries)

    // Sort countries by their common name
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    // Empty array to push an array with all (repeated) continents
    let allContinents = [];

    // Go through all countries
    countries.forEach(country => {
      country.continents.forEach(continent => {
        allContinents.push(continent);
      })
    })

    // Get unique continents
    let uniqueContinents = [];
    allContinents.forEach(continent => {
      if (!uniqueContinents.includes(continent)) {
        uniqueContinents.push(continent);
      }
    });
    console.log(uniqueContinents)
    
    // Pro version of getting unique continents
    // const continents = [...new Set(countries.flatMap(country => country.continents))];
    // console.log(continents);


    
    countries.forEach(country => {

      uniqueContinents.forEach()
      // if (loadCountriesByContinent) {
        // countriesNode.innerHTML += loadCountriesByContinent(country)
      // }
      countriesNode.innerHTML += cardTemplate(country);
    })
  } catch (error) {
    console.error(error.message);
    
  }
}

getCountriesData();


//TODO: una vez terminado el fetch pasarlo a axios





// const loadGenres = async () => {
//   try {
//     // First get all genre IDs
//     const response = await axios.get(`/genre/movie/list`, {
//       params: {
//         language: 'en-US'
//       }
//     })

//     const genres = response.data.genres;
//     console.log('Genres loaded:', genres);

//     genres.forEach(genre => {
//       const option = document.createElement('option');
//       option.value = genre.id;
//       option.textContent = genre.name;
//       genreSelect.appendChild(option);
//     })

    
//   } catch (error) {
//     console.error('Error loading genres',error)
//   }
// }

// const loadCountriesByContinent = (country) => {

//   const a = ''

// }






// // We capture elements from the DOM
// const formData = document.getElementById('formData');
// const searchInput = document.getElementById('searchInput');
// const sectionMovies = document.getElementById('containerMovies');
// const genreSelect = document.getElementById('movieGenre');


// const searchAndShowTheMovie = async (e) => {
//   e.preventDefault();

//   containerMovies.innerHTML = '';
//   const movieSearch = searchInput.value.trim();
//   const selectedGenre = genreSelect.value;
//   console.log('Selected genre:', selectedGenre);

//   try {
//     let response;

//     if (movieSearch) {
//       // Search by title
//       response = await axios.get('/search/movie', {
//         params: {
//           query: movieSearch,
//           language: 'en-US'
//         }
//       });
//     } else if (selectedGenre !== "") {
//       // Filter by genre
//       response = await axios.get('/discover/movie', {
//         params: {
//           with_genres: selectedGenre,
//           language: 'en-US'
//         }
//       });
//     }

//     const movies = response.data.results;
//     renderMovies(movies);

//   } catch (error) {
//     console.error('Error fetching movies:', error);
//   }

//   searchInput.value = '';
// };

// // Function to render all the movies of the search
// // 1. we pass the searched data array as an argument.
// // 2. we iterate the array and we call to createMovieCard() function.
// const renderMovies = (movies) => {
//   movies.forEach(movie => {    
//     createMovieCard(movie)    
//   });
// }

// const createMovieCard = (movie) => {
//   const posterUrl = movie.poster_path 
//     ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
//     : 'placeholder.jpg'; // Fallback if no poster

//   // DOM content creation (HTML)
//   const movieCard = document.createElement('div');
  
//   const moviePoster = document.createElement('img');
//   moviePoster.setAttribute('src', posterUrl);
//   moviePoster.setAttribute('alt', `${movie.title} poster`);

//   const movieTitle = document.createElement('h1');
//   movieTitle.textContent = `${movie.title}`;

//   movieCard.append(moviePoster, movieTitle);

//   sectionMovies.appendChild(movieCard);
// }

// const loadGenres = async () => {
//   try {
//     // First get all genre IDs
//     const response = await axios.get(`/genre/movie/list`, {
//       params: {
//         language: 'en-US'
//       }
//     })

//     const genres = response.data.genres;
//     console.log('Genres loaded:', genres);

//     genres.forEach(genre => {
//       const option = document.createElement('option');
//       option.value = genre.id;
//       option.textContent = genre.name;
//       genreSelect.appendChild(option);
//     })

    
//   } catch (error) {
//     console.error('Error loading genres',error)
//   }
// }

// loadGenres()


// formData.addEventListener('submit', searchAndShowTheMovie);
// genreSelect.addEventListener('change', searchAndShowTheMovie);