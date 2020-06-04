import React, { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import NavLinks from "./NavLinks";
import SideNav from "./SideNav";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  useEffect(() => {
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, {});
  }, []);

  return (
    <>
      <nav className="navbar-fixed transparent" role="navigation">
        <div className="nav-wrapper container">
          <NavLink to="/" exact>
            <div id="logo-container" className="brand-logo">
              <img src="/beenherelogo.png" alt="" />
            </div>
          </NavLink>
          <ul className="right hide-on-med-and-down">
            <NavLinks />
            {/* <NavLink linkname="Home" link="/" />
            <NavLink linkname="My Places" link="/places" />
            <NavLink linkname="Add Place" link="/places/new" />
            <NavLink linkname="Login" /> */}
          </ul>

          <a href="#!" data-target="slide-out" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
      <SideNav />
    </>
  );
};

export default Navigation;
