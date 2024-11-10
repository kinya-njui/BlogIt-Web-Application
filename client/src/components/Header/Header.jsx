import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function NavbarHeader() {
  return (
    <div className="nav-bar">
      <h3 className="header-tittle">BlogIt</h3>
      <nav>
        <ol className="navigationlist">
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}
function Header() {
  return (
    <header>
      <NavbarHeader />
    </header>
  );
}

export default Header;
