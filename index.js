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

    // Sort countries by their common name
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    countries.forEach(country => {
      countriesNode.innerHTML += cardTemplate(country);
    })
  } catch (error) {
    console.error(error.message);
    
  }
}

getCountriesData();


//TODO: una vez terminado el fetch pasarlo a axios

