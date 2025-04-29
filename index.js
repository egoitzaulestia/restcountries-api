const cardTemplate = function (country) {
  return `<div class="card">
              <img id="flag-image" src="${country.flags.png}" alt="flag" />
              <h1 class="center">${country.name.common}</h1>
            </div>`;
};

const countriesNode = document.getElementById("countries");
const continentSelect = document.getElementById('selectContinent');

const getCountriesData = async () => {
  const url = 'https://restcountries.com/v3.1/all';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error((`Response status: ${response.status}`));
    }

    const countries = await response.json();
    // console.log(countries)

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
    // console.log(uniqueContinents)
    
    // Pro version of getting unique continents
    // const continents = [...new Set(countries.flatMap(country => country.continents))];
    // console.log(continents);

    loadContinents(uniqueContinents)
    // console.log(continentSelect.value)

    countriesNode.innerHTML = ''; // clear previous

    countries.forEach(country => {
      if (
        continentSelect.value === '' || 
        country.continents.includes(continentSelect.value)
      ) {
        countriesNode.innerHTML += cardTemplate(country);
      }
    });

  } catch (error) {
    console.error(error.message);
    
  }
}


const loadContinents = (continents) => {
  try {
    // First get all the continents
    const worldContinents = continents;

    worldContinents.forEach(continent => {
      const option = document.createElement('option');
      option.value = continent;
      option.textContent = continent;
      continentSelect.appendChild(option);
    })

  } catch (error) {
    console.error(error);
  }
}

getCountriesData();
continentSelect.addEventListener('change', getCountriesData);

