import React, { useContext } from "react";
import { Dropdown, Button, Divider } from "react-materialize";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <>
      <li>
        <NavLink to="/" exact>
          Feed
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/1/places">My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add a Place</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Auth</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Dropdown
            id="Dropdown_6"
            options={{
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              container: null,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            }}
            trigger={<Button node="button">Drop Me!</Button>}
          >
            <NavLink to="/">Me</NavLink>
            <Divider />
            <a href="#!" onClick={auth.logout}>Logout</a>
          </Dropdown>
        </li>
      )}
    </>
  );
};

export default NavLinks;
