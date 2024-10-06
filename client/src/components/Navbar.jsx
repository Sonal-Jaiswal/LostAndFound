import React from 'react';

export const CustomNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">FindIt</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Lost & Found
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/lost">Lost-item</a></li>
                <li><a className="dropdown-item" href="/found">Found-item</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/map">Mapify</a></li>
              </ul>
            </li>

          </ul>
          <div className="d-flex">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Track-your-items
              </a>
          <ul className="dropdown-menu">
              <li><a className="nav-link" href="/track">Track-Lost</a></li>
              <li><a className="nav-link" href="/trackfound">Track-Found</a></li>
              <li><a className="nav-link" href="/matched">Matched-Items</a></li>
          </ul>
          </li>
          </li>
          </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
