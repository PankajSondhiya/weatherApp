import axios from "axios";
import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import clearIcon from "./Assests/clear.png";
import snowIcon from "./Assests/snow.png";
import cloudIcon from "./Assests/cloudy.png";
import fogIcon from "./Assests/foggy.png";
import hazeIcon from "./Assests/haze.png";
import mistIcon from "./Assests/mist.png";
import backcloudIcon from "./Assests/backcloud.png";
import { FaSearch } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

import { ToastContainer, toast } from "react-toastify";
function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [showMainData, setShowMainData] = useState(false);

  async function fetchData() {
    const APIKey = "3e699a092a40ac34acd099e02314c7ff";
    if (city === "") {
      alert("Enter the city name");
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
      );
      setWeatherData(response.data);
      setShowMainData(true);
    } catch (ex) {
      console.log("Error occurred while fetching the data", ex);
      alert("Enter the valid city");
    }
  }
  function selectIcon(wheater) {
    switch (wheater) {
      case "Clear":
        return clearIcon;
      case "Snow":
        return snowIcon;
      case "Cloud":
        return cloudIcon;
      case "Mist":
        return mistIcon;
      case "Haze":
        return hazeIcon;
      case "Fog":
        return fogIcon;
      default:
        return;
    }
  }

  return (
    <div className="contianer background_image">
      <div className="wrapper_row">
        <div className="title">
          <h1>Track the weather of your city</h1>
        </div>

        <div
          className="data_wrapper"
          style={showMainData ? { height: "50vh" } : { height: "5vh" }}
        >
          <div className="search_bar">
            <div className="custom_input">
              <input
                type="text"
                className="form-control custom_form"
                placeholder="Enter the city name"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="search_icon" onClick={fetchData}>
              <FaSearch />
            </div>
            <div className="cross_icon">
              <RxCrossCircled
                onClick={(event) => {
                  setCity("");
                  setWeatherData(null);
                  setShowMainData(false);
                }}
              />
            </div>
          </div>
          {showMainData && (
            <div className="main_data">
              <div className="weather_icon">
                <img
                  src={selectIcon(
                    weatherData ? weatherData.weather[0].main : ""
                  )}
                  alt="weather icon"
                />
              </div>
              <div className="description">
                <h2>{weatherData ? weatherData.weather[0].description : ""}</h2>
              </div>
              <div className="weather_details">
                <div className="humidity">
                  <div>
                    <h2>{weatherData ? weatherData.main.humidity : ""}</h2>
                  </div>
                  <div>
                    <h4>Humidity</h4>
                  </div>
                </div>
                <div className="temp">
                  <div>
                    <h2>{weatherData ? weatherData.main.temp : ""}°C</h2>
                  </div>
                  <div>
                    <h4>Temperature</h4>{" "}
                  </div>
                </div>
                <div className="windspeed">
                  <div>
                    <h2>{weatherData ? weatherData.wind.speed : ""}</h2>
                  </div>
                  <div>
                    <h4>WindSpeed</h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
