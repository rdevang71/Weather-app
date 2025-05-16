import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [city, setCity] = useState("");
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const navigate = useNavigate();

  // Animate background movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPosition((prev) => (prev + 1) % 100);
    }, 100); // adjust speed here

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      navigate(`/weather?city=${encodeURIComponent(city)}`);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          navigate(`/weather?lat=${latitude}&lon=${longitude}`);
        },
        error => {
          alert("Error retrieving location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const featuredCities = ["New York", "Tokyo", "London", "Sydney", "Paris"];

  const containerStyle = {
    minHeight: "100vh",
    padding: "2rem",
    color: "#333",
    background: "linear-gradient(-45deg, #9dd6f9, #dfe9f3, #c0ebff, #a5d8ff)",
    backgroundSize: "400% 400%",
    backgroundPosition: `${backgroundPosition}% 50%`,
    transition: "background-position 0.5s ease",
  };

  const hoverBtnStyle = {
    transition: "transform 0.2s ease, background-color 0.3s",
    cursor: "pointer"
  };

  return (
    <div className="rounded shadow" style={containerStyle}>
      <h2 className="mb-3 text-primary">
        <i className="fas fa-cloud-sun me-2"></i>Welcome to WeatherWise
      </h2>
      <p className="lead">
        🌦️ Your personalized weather dashboard. Get live updates, track locations, and stay informed!
      </p>

      {/* Search Section */}
      <div className="mt-4">
        <form onSubmit={handleSearch} className="d-flex mb-3">
          <input 
            type="text" 
            className="form-control me-2 shadow-sm" 
            placeholder="Enter city name..." 
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="btn btn-primary shadow-sm">
            <i className="fas fa-search me-1"></i>Search
          </button>
        </form>
        <button className="btn btn-info shadow-sm mb-4" onClick={handleCurrentLocation}>
          <i className="fas fa-location-arrow me-2"></i>Use My Current Location
        </button>
      </div>

      {/* Featured Cities */}
      <div className="mt-4">
        <h4 className="text-success"><i className="fas fa-map-marker-alt me-2"></i>Popular Cities</h4>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {featuredCities.map((c) => (
            <button
              key={c}
              className="btn btn-outline-secondary"
              style={hoverBtnStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              onClick={() => navigate(`/weather?city=${encodeURIComponent(c)}`)}
            >
              <i className="fas fa-location-dot me-1"></i>{c}
            </button>
          ))}
        </div>
      </div>

      {/* Weather Facts */}
      <div className="mt-5">
        <div className="card border-0 shadow-sm bg-warning bg-gradient text-dark">
          <div className="card-body">
            <h5 className="card-title"><i className="fas fa-lightbulb me-2"></i>Did You Know?</h5>
            <ul className="mb-0">
              <li>• Death Valley recorded the hottest temperature: 56.7°C (134°F).</li>
              <li>• Around 100 lightning bolts strike the Earth every second.</li>
              <li>• Rainbows are complete circles—seen fully only from above!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Weather Tips */}
      <div className="mt-4">
        <div className="card border-0 shadow-sm bg-info text-white">
          <div className="card-body">
            <h5 className="card-title"><i className="fas fa-info-circle me-2"></i>Quick Tips</h5>
            <p className="card-text">
              Always check the forecast before stepping out. Dress according to the weather,
              carry an umbrella if needed, and drink plenty of water.
            </p>
          </div>
        </div>
      </div>

      {/* Inspirational Quote */}
      <div className="mt-5 text-center">
        <blockquote className="blockquote text-muted">
          <p style={{ fontStyle: "italic" }}>
            "Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating;
            there is really no such thing as bad weather, only different kinds of good weather."
          </p>
          <footer className="blockquote-footer">John Ruskin</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default Home;

