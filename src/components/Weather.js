import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Weather = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const latitude = queryParams.get("lat");
  const longitude = queryParams.get("lon");
  const city = queryParams.get("city");

  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "ceb7588fe54b6b6411b0cee20d4d2c03";

  // Helper functions for descriptive details:

  // Temperature description based on °C
  const getTemperatureDescription = (temp) => {
    if (temp < 0) {
      return "Freezing";
    } else if (temp < 10) {
      return "Cold";
    } else if (temp < 20) {
      return "Mild";
    } else if (temp < 30) {
      return "Warm";
    } else {
      return "Hot";
    }
  };

  // Humidity description based on percentage
  const getHumidityDescription = (humidity) => {
    if (humidity < 30) {
      return "Dry";
    } else if (humidity < 60) {
      return "Comfortable";
    } else {
      return "Humid";
    }
  };

  // Wind Speed description based on m/s
  const getWindSpeedDescription = (speed) => {
    if (speed < 1) {
      return "Calm";
    } else if (speed < 5) {
      return "Light breeze";
    } else if (speed < 10) {
      return "Moderate breeze";
    } else {
      return "Strong winds";
    }
  };

  // Wind Gust description based on m/s
  const getWindGustDescription = (gust) => {
    if (!gust) return "No gust data";
    if (gust < 3) {
      return "Mild";
    } else if (gust < 8) {
      return "Occasional gusts";
    } else {
      return "Heavy gusts";
    }
  };

  // Convert wind degrees into a cardinal direction
  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  // Visibility description based on km
  const getVisibilityDescription = (visibilityKm) => {
    if (visibilityKm >= 10) {
      return "Very clear";
    } else if (visibilityKm >= 7) {
      return "Clear";
    } else if (visibilityKm >= 5) {
      return "Moderate";
    } else {
      return "Poor";
    }
  };

  // Pressure description based on hPa
  const getPressureDescription = (pressure) => {
    if (pressure < 1000) {
      return "Low pressure";
    } else if (pressure <= 1020) {
      return "Normal pressure";
    } else {
      return "High pressure";
    }
  };

  // Cloud coverage description based on percentage
  const getCloudCoverageDescription = (coverage) => {
    if (coverage < 20) {
      return "Clear skies";
    } else if (coverage < 50) {
      return "Partly cloudy";
    } else if (coverage < 80) {
      return "Mostly cloudy";
    } else {
      return "Overcast";
    }
  };

  // Format timezone to string like "UTC +5:30"
  const formatTimezone = (timezone) => {
    const hours = Math.floor(timezone / 3600);
    const minutes = Math.abs(Math.floor((timezone % 3600) / 60));
    return `UTC ${hours >= 0 ? "+" : "-"}${Math.abs(hours)}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let url = "";
    if (latitude && longitude) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    }

    if (url) {
      axios
        .get(url)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [latitude, longitude, city]);

     const keyframes = `
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`; 
const gradientStyle = {
  background: 'linear-gradient(-45deg, #0f2027, #203a43, #2c5364)',
  backgroundSize: '400% 400%',
  animation: 'gradientMove 15s ease infinite',
  minHeight: "100vh",
  padding: "20px"
};
  return (
    <div
      style={{
        backgroundColor: "#f8f9fa", // Light background color (Bootstrap's light gray)
        background: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)',
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container mt-4">
        <div
          className="card shadow-lg p-4 text-dark rounded"
          style={{ background: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)', }}
        >
          <h2 className="text-center mb-4 text-primary">
            <i className="fas fa-cloud-sun-rain me-2"></i>Weather Forecast
          </h2>

          {weatherData ? (
            <div className="text-center">
              <h3 className="fw-bold ">
                {weatherData.name}, {weatherData.sys.country}
              </h3>
              <p className="lead text-muted">
                {weatherData.weather[0].description.toUpperCase()}
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
                {/* Temperature */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://t4.ftcdn.net/jpg/02/10/54/69/360_F_210546904_9BCZEy11YRxLIXH4WHC1btb0sPx7nF2m.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      🌡️
                    </span>
                    Temperature
                  </h5>
                  <p className="fs-4">{weatherData.main.temp}°C</p>
                  <p className="fs-6 ">
                    {getTemperatureDescription(weatherData.main.temp)}
                  </p>
                  <p className="fs-6 ">
                    This value helps you decide on appropriate clothing. A{" "}
                    {getTemperatureDescription(
                      weatherData.main.temp
                    ).toLowerCase()}{" "}
                    day might require extra layers or light wear.
                  </p>
                </div>

                {/* Feels Like */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://www.weatherzone.com.au/news-thumbnail/2946660')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      🌬️
                    </span>
                    Feels Like
                  </h5>
                  <p className="fs-4">{weatherData.main.feels_like}°C</p>
                  <p className="fs-6 ">
                    {getTemperatureDescription(weatherData.main.feels_like)}
                  </p>
                  <p className="fs-6 ">
                    The 'feels like' metric factors in wind and humidity for a
                    better sense of outdoor comfort.
                  </p>
                </div>

                {/* Humidity */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://image.shutterstock.com/image-photo/fogged-glass-cold-humidity-large-260nw-2164656079.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      💧
                    </span>
                    Humidity
                  </h5>
                  <p className="fs-4">{weatherData.main.humidity}%</p>
                  <p className="fs-6 ">
                    {getHumidityDescription(weatherData.main.humidity)}
                  </p>
                  <p className="fs-6 ">
                    Humidity impacts how your body cools itself. High levels can
                    create a muggy feel, while low levels are typically dry.
                  </p>
                </div>

                {/* Wind Speed */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-airport-wind-speed-red-sign-image_15692989.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      🌪️
                    </span>
                    Wind Speed
                  </h5>
                  <p className="fs-4">{weatherData.wind.speed} m/s</p>
                  <p className="fs-6 ">
                    {getWindSpeedDescription(weatherData.wind.speed)}
                  </p>
                  <p className="fs-6 ">
                    Wind speed influences your comfort, sometimes offering a
                    refreshing coolness or becoming disruptive.
                  </p>
                </div>

                {/* Wind Gust */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://img.freepik.com/premium-photo/wind-gusts-bending-trees-coastal-area-background_987764-32111.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      💨
                    </span>
                    Wind Gust
                  </h5>
                  <p className="fs-4">
                    {weatherData.wind.gust ? weatherData.wind.gust : "N/A"} m/s
                  </p>
                  <p className="fs-6 ">
                    {getWindGustDescription(weatherData.wind.gust)}
                  </p>
                  <p className="fs-6 ">
                    Sudden gusts can impact outdoor activities and driving
                    conditions.
                  </p>
                </div>

                {/* Wind Direction */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://thumbs.dreamstime.com/b/weather-map-wind-d-rendering-245531642.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      🧭
                    </span>
                    Wind Direction
                  </h5>
                  <p className="fs-4">
                    {weatherData.wind.deg}° (
                    {getWindDirection(weatherData.wind.deg)})
                  </p>
                  <p className="fs-6 ">
                    Knowing the wind direction can help you plan outdoor events
                    and understand incoming weather changes.
                  </p>
                </div>

                {/* Visibility */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://images.iphonephotographyschool.com/15180/616/Minimalist-iPhone-Photography-11.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      🔆
                    </span>
                    Visibility
                  </h5>
                  <p className="fs-4">
                    {(weatherData.visibility / 1000).toFixed(1)} km
                  </p>
                  <p className="fs-6 ">
                    {getVisibilityDescription(weatherData.visibility / 1000)}
                  </p>
                  <p className="fs-6 ">
                    Good visibility means safer driving and outdoor activities,
                    while poor visibility may suggest fog or rain.
                  </p>
                </div>

                {/* Pressure */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://t3.ftcdn.net/jpg/00/21/09/88/360_F_21098806_npDxXlF9cTS8Ltyo8DKxUQ8b0RXy7rMl.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      📊
                    </span>
                    Pressure
                  </h5>
                  <p className="fs-4">{weatherData.main.pressure} hPa</p>
                  <p className="fs-6 ">
                    {getPressureDescription(weatherData.main.pressure)}
                  </p>
                  <p className="fs-6 ">
                    Atmospheric pressure trends can signal shifting weather.
                    Falling pressure may indicate rain, while high pressure
                    suggests clear skies.
                  </p>
                </div>

                {/* Cloud Coverage */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://img.freepik.com/premium-photo/satellite-image-showing-cloud-cover-background_987764-38042.jpg?w=996')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      ☁️
                    </span>
                    Cloud Coverage
                  </h5>
                  <p className="fs-4">{weatherData.clouds.all}%</p>
                  <p className="fs-6 ">
                    {getCloudCoverageDescription(weatherData.clouds.all)}
                  </p>
                  <p className="fs-6 ">
                    The amount of cloud cover can influence sunlight levels and
                    overall temperature.
                  </p>
                </div>

                {/* Timezone */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://wallpaperaccess.com/full/333717.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      🕰️
                    </span>
                    Timezone
                  </h5>
                  <p className="fs-4">{formatTimezone(weatherData.timezone)}</p>
                  <p className="fs-6 ">
                    Your local timezone is key to scheduling activities and
                    understanding sunrise/sunset timings.
                  </p>
                </div>

                {/* Sunrise */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://wallpaperaccess.com/full/1224284.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      🌅
                    </span>
                    Sunrise
                  </h5>
                  <p className="fs-4">
                    {new Date(
                      weatherData.sys.sunrise * 1000
                    ).toLocaleTimeString()}
                  </p>
                  <p className="fs-6 ">
                    The sunrise signals the start of a new day—a perfect moment
                    for early risers and photographers.
                  </p>
                </div>

                {/* Sunset */}
                <div
                  className="card shadow-sm p-3 rounded w-50"
                  style={{
                    backgroundImage: "url('https://images8.alphacoders.com/995/995494.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                  }}
                  
                >
                  <h5>
                    <span style={{ fontSize: "3rem", marginRight: "0.5rem" }}>
                      🌇
                    </span>
                    Sunset
                  </h5>
                  <p className="fs-4">
                    {new Date(
                      weatherData.sys.sunset * 1000
                    ).toLocaleTimeString()}
                  </p>
                  <p className="fs-6 ">
                    Sunset marks the end of the day—a time to relax and enjoy
                    the evening colors.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center fs-4 text-warning">
              Fetching weather data...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
