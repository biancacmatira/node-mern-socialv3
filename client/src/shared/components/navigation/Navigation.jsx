import React from "react";

import NavLink from './NavLinks';

const Navigation = () => {
  return (
    <nav className="navbar-fixed transparent" role="navigation">
      <div className="nav-wrapper container">
        <a id="logo-container" href="/" className="brand-logo">
          <img src="/beenherelogo.png" alt="" />
        </a>
        <ul className="right hide-on-med-and-down">
          <NavLink linkname="Home" />
          <NavLink linkname="Login" />
        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li>
            <a href="/">Navbar Link</a>
          </li>
        </ul>
        <a href="/" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
