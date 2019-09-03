import React from "react";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <a className="navbar-brand" href="#home">
        What's Shakin'
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#count">
              Current Count
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#history">
              History
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#feature">
              Feature
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#mags">
              4.5 Magnitudes
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
