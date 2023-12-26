import "./WeatherApp.css";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useEffect, useState } from "react";
// const API_URL = "https://api.openweathermap.org/data/2.5/weather";
// const API_KEY = "cad36af5fe09010edaedab5a551488bb";
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "",
    temp: null,
    tempMax: null,
    tempMin: null,
    humidity: null,
    feelsLike: null,
    weather: "",
    // city: "Delhi",
    // temp: 20.09,
    // tempMax: 35.09,
    // tempMin: 20.09,
    // humidity: 56,
    // feelsLike: 19.62,
    // weather: "smoke",
  });

  // using useEffect to show initial weather Info
  useEffect(() => {
    let initInfo = async () => {
      let city = "Amsterdam";

      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();
      console.log(jsonResponse);

      setWeatherInfo({
        city: city,
        temp: jsonResponse.main.temp,
        tempMax: jsonResponse.main.temp_max,
        tempMin: jsonResponse.main.temp_min,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      });
      // console.log(result);
    };
    initInfo();
  }, []);

  let updateInfo = (newinfo) => {
    setWeatherInfo(newinfo);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
