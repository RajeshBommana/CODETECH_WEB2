// API configuration object containing the key and base URL
const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

// Selecting the search box element
const searchbox = document.querySelector('.search-box');
// Adding an event listener to the search box to listen for 'keypress' events
searchbox.addEventListener('keypress', setQuery);

// Function to handle the 'keypress' event
function setQuery(evt) {
  if (evt.keyCode == 13) { // Check if the Enter key (key code 13) is pressed
    getResults(searchbox.value); // Call the getResults function with the value from the search box
  }
}

// Function to fetch weather data from the API
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) // Constructing the API request URL
    .then(weather => {
      return weather.json(); // Parsing the response as JSON
    }).then(displayResults); // Calling the displayResults function with the parsed JSON
}

// Function to display the fetched weather data in the UI
function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`; // Setting the city and country

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now); // Setting the current date

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`; // Setting the current temperature

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main; // Setting the weather description

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`; // Setting the high and low temperatures
}

// Function to build the date string
function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()]; // Getting the day of the week
  let date = d.getDate(); // Getting the day of the month
  let month = months[d.getMonth()]; // Getting the month
  let year = d.getFullYear(); // Getting the year

  return `${day} ${date} ${month} ${year}`; // Returning the formatted date string
}
