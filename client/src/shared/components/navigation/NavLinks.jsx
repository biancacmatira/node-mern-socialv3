import React from "react";

const NavLinks = (props) => {
  return (
    <li>
      <a href={props.link} >{props.linkname}</a>
    </li>
  );
};

export default NavLinks;
