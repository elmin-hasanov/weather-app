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
          console.log(endWeatherData.main.temp);
        });
    })
    .catch((err) => console.log(err));
}
