import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
      <div className="container">
        {/* Make Logo Png */}
        <Link className="navbar-brand" to="/">
          <img
            src={process.env.PUBLIC_URL + "/LogoHealthHub.png"}
            alt="logo"
            height="50px"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active mx-3" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link active mx-3" to="/articles">
              Articles
            </Link>
            <Link className="nav-link active mx-3" to="/qnas">
              QnA
            </Link>
            {/* <Link className="nav-link mx-3" to="/login">Login</Link> */}
            <Link className="btn btn-auth mx-3 text-white" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
