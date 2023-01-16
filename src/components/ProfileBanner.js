import React from "react";
import "./Banner.css";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileBanner = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <div className="container banner-grey">
      <div className="row pt-4">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-center text-center">
          <img
            src={process.env.PUBLIC_URL + "/profilebanner.png"}
            alt="hero"
            className="img-fluid"
            width="60%"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-center text-center mt-5">
          <div className="hero-section">
            <h1 className="hero-title py-2">We are here to help you.</h1>
            <h4 className="hero-text">
              Hello, {currentUser.first_name + " " + currentUser.last_name}!
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
