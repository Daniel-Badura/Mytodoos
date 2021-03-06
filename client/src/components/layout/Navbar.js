import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ icon, title }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}> </i> {title}{" "}
      </h1>{" "}
      <ul>
        <li>
          {" "}
          <Link to="/"> Home </Link>
        </li>
        <li>
          {" "}
          <Link to="/about"> About </Link>
        </li>
      </ul>{" "}
    </div>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "Mytodoos",
  icon: "fas fa-tasks",
};
export default Navbar;
