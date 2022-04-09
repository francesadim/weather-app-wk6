let now = new Date();
let h3 = document.querySelector("#date");
let time = now.toLocaleTimeString();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h3.innerHTML = `${day}, ${time}`;

function showTemperature(response) {
  console.log(response);
  //document.querySelector("#city").innerHTML = response.data.name;
  let h2 = document.querySelector("#city");
  let h4 = document.querySelector("#current-temp");
  let h5 = document.querySelector("#current-humidity");
  let h6 = document.querySelector("#current-wind");
  h2.innerHTML = response.data.name;
  h4.innerHTML = Math.round(response.data.main.temp);
  h5.innerHTML = response.data.main.humidity;
  h6.innerHTML = Math.round(response.data.wind.speed);
}

function citySearch(city) {
  let apiKey = "d5453a99d7bbcbcb83f0b73e111b264c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  citySearch(city);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d5453a99d7bbcbcb83f0b73e111b264c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);

let currentLocationButton = document.querySelector("#geo-location-button");
currentLocationButton.addEventListener("click", getLocation);

citySearch("Lagos");
