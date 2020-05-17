import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <ul className="header">
      <div>
        <li>
          <NavLink activeClassName="active" to="/all">
            1
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/dummy2">
            2
          </NavLink>
        </li>
      </div>
    </ul>
  );
};

export default Header;
