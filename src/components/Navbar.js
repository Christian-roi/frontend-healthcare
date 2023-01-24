import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

import { logout } from "../redux/actions/auth";
import { clearMessage } from "../redux/actions/message";

const Navbar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    window.location.reload();
  }, [dispatch]);

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
            {/* If currentUser.roleid = 1 */}
            {currentUser?.role === "Admin" ? (
              <Fragment>
                <Link className="nav-link active mx-3" to="/admin">
                  Admin
                </Link>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
            {/* {currentUser && currentUser.role === "Editor" ? (
              <Fragment>
                <Link className="nav-link active mx-3" to="/articles">
                  Create Articles
                </Link>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )} */}
            {/* {currentUser && currentUser.role === "Doctor" ? (
              <Fragment>
                <Link className="nav-link active mx-3" to="/admin">
                  Admin
                </Link>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )} */}
            {currentUser ? (
              <Fragment>
                <Link className="nav-link active mx-3" to="/profile">
                  Profile
                </Link>
                <Link to="/">
                  <button
                    className="btn btn-danger mx-3 text-white"
                    onClick={handleLogout}
                    type="button"
                  >
                    Log Out
                  </button>
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link className="btn btn-auth mx-3 text-white" to="/login">
                  Login
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
