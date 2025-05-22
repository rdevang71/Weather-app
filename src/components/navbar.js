import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Inline styles for animated gradient
  const gradientStyle = {
    background: 'linear-gradient(-45deg, #0f2027, #203a43, #2c5364)',
    backgroundSize: '400% 400%',
    animation: 'gradientMove 15s ease infinite'
  };

  // Inject keyframes inline (works only if added to a <style> tag in JSX)
  const keyframes = `
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <>
      {/* Inject keyframes into document head */}
      <style>{keyframes}</style>

      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top py-3 px-3"
        style={gradientStyle}
      >
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center text-info fw-bold" to="/">
            <i className="fas fa-cloud-sun me-2 animate__animated animate__pulse animate__infinite"></i>
            WeatherHub
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-uppercase fw-semibold">
              <li className="nav-item mx-2">
                <Link
                  to="/weather"
                  className={`nav-link px-3 py-2 rounded ${isActive('/weather') ? 'bg-info text-dark' : 'text-light'} nav-hover`}
                >
                  <i className="fas fa-cloud-sun me-1"></i>Weather
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  to="/search"
                  className={`nav-link px-3 py-2 rounded ${isActive('/search') ? 'bg-info text-dark' : 'text-light'} nav-hover`}
                >
                  <i className="fas fa-magnifying-glass me-1"></i>Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
