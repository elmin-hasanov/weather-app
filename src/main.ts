const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchButton") as HTMLButtonElement;
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

const errorMessage = document.getElementById("errorMessage") as HTMLDivElement;



cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeatherHeat(cityInput.value);
  }
})

searchBtn.addEventListener("click", () => {
  getWeatherHeat(cityInput.value);
});


const myWeatherKey = "79d687152090a1108c1deb50501a57e1";
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
          temperature.innerHTML = `${Math.round(endWeatherData.main.temp)} °C`;

          

          weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${endWeatherData.weather[0].icon}@2x.png"/>`;
          cityName.innerHTML = `${endWeatherData.name}`
          countryName.innerHTML = `${endWeatherData.sys.country}`

          const date = new Date(endWeatherData.dt * 1000);
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          localTime.innerHTML = `<p>LocalTime <span>${hours}:${minutes}</span></p>`;



          windSpeed.innerHTML = `<p>WindSpeed <span>${endWeatherData.wind.speed}</span></p>`
          cloudiness.innerHTML = `<p>Cloudiness <span>${endWeatherData.clouds.all} %</span></p>`
          pressure.innerHTML = `<p>Pressure <span>${endWeatherData.main.pressure} hpa</span></p>`
          humidity.innerHTML = `<p>Humidity <span>${endWeatherData.main.humidity} %</span></p>`
          geoCoords.innerHTML = `<p>GeoCoords <span>${endWeatherData.coord.lon}, ${endWeatherData.coord.lat}</span></p>`


          const date1 = new Date(endWeatherData.sys.sunrise * 1000);
          const hours1 = String(date1.getHours()).padStart(2, '0');
          const minutes1 = String(date1.getMinutes()).padStart(2, '0');
          sunrise.innerHTML = `<p>Sunrise <span>${hours1}:${minutes1}</span></p>`


          const date2 = new Date(endWeatherData.sys.sunset * 1000);
          const hours2 = String(date2.getHours()).padStart(2, '0');
          const minutes2 = String(date2.getMinutes()).padStart(2, '0');
          sunset.innerHTML = `<p>Sunset <span>${hours2}:${minutes2}</span></p>`


        });
    })
    .catch((err) => console.log(err));
    if (city === "") {
      errorMessage.innerHTML = `<p>City not found</p>`;
    } else {
      errorMessage.style.display = "none";
    }
}
