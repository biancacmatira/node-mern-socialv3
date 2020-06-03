import React from "react";
import NavLink from "./NavLinks";

const SideNav = () => {
  return (
    <ul id="slide-out" className="sidenav">
      <li>
        <a href="/">First Link</a>
      </li>
      <li>
        <div className="divider"></div>
      </li>
      <NavLink linkname="Feed" link="/" />
      <NavLink linkname="My Places" link="/places" />
      <NavLink linkname="Add a Place" link="/places/new" />
      <NavLink linkname="Login" />
    </ul>
  );
};

export default SideNav;
