const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchButton") as HTMLButtonElement;
const weatherContainer = document.getElementById("weatherContainer") as HTMLDivElement;
const cityName = document.getElementById("cityName") as HTMLParagraphElement;
const countryName = document.getElementById("countryName") as HTMLParagraphElement;
const weatherIcon = document.getElementById("weatherIcon") as HTMLImageElement;
const temperature = document.getElementById("temperature") as HTMLParagraphElement;

const localTime = document.getElementById("localTime") as HTMLParagraphElement;
const windSpeed = document.getElementById("windSpeed") as HTMLParagraphElement;
const cloudiness = document.getElementById("cloudiness") as HTMLParagraphElement;
const pressure = document.getElementById("pressure") as HTMLParagraphElement;
const humidity = document.getElementById("humidity") as HTMLParagraphElement;
const sunrise = document.getElementById("sunrise") as HTMLParagraphElement;
const sunset = document.getElementById("sunset") as HTMLParagraphElement;
const geoCoords = document.getElementById("geoCoords") as HTMLParagraphElement;


cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeatherHeat(cityInput.value);
  }
})

searchBtn.addEventListener("click", () => {
  getWeatherHeat(cityInput.value);
});


const myWeatherKey = "fa2537d770241796fc4f44123fb03c26";
function getWeatherHeat(city: string) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${myWeatherKey}`
  )
    .then((response) => response.json())
    .then((myWeatherData) => {
      const lon = myWeatherData[0].lon;
      const lat = myWeatherData[0].lat;
      console.log(myWeatherData);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myWeatherKey}&units=metric`
      )
        .then((response) => response.json())
        .then((endWeatherData) => {
          temperature.innerHTML = `${endWeatherData.main.temp} °C`;
          weatherIcon.src = `http://openweathermap.org/img/wn/${endWeatherData.weather[0].icon}@2x.png`;
        });
    })
    .catch((err) => console.log(err));
}
