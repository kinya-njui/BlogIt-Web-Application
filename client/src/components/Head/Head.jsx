import React from "react";
import "./Head.css";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useDetailStore from "../../utils/useDetailStore";

function Head() {
  const logout = useDetailStore((state) => state.logout);
  function handleLogout() {
    logout();
    toast.success("logged out successfully");
    navigate("/login");
  }
  return (
    <div className="nav-bar">
      <h3 className="header-tittle">BlogIt</h3>
      <nav>
        <ol className="navigationlist">
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/write">write</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/writer-feed">feed</Link>
          </li>
          <li>
            <Link to="/update-profile">profile</Link>
          </li>
          <li>
            <Link onClick={handleLogout}>logout</Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}
function Header() {
  return (
    <header>
      <NavbarHead />
    </header>
  );
}

export default Head;
