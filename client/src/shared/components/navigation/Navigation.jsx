import React, { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import NavLink from "./NavLinks";
import SideNav from "./SideNav";

const Navigation = () => {
  useEffect(() => {
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, {});
  }, []);

  return (
    <>
      <nav className="navbar-fixed transparent" role="navigation">
        <div className="nav-wrapper container">
          <a id="logo-container" href="/" className="brand-logo">
            <img src="/beenherelogo.png" alt="" />
          </a>
          <ul className="right hide-on-med-and-down">
            <NavLink linkname="Home" />
            <NavLink linkname="Login" />
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
