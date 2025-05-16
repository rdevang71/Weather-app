import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          <i className="fas fa-house me-2"></i>Home
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/weather">
                <i className="fas fa-cloud-sun me-1"></i>Weather
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/search">
                <i className="fas fa-magnifying-glass me-1"></i>Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
