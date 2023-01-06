import React from "react";
import "./Banner.css";
import "./Navbar.css";
import { Link } from "react-router-dom";

const QnABanner = () => {
  return (
    <div className="container banner-qna">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-center text-center">
          <img
            src={process.env.PUBLIC_URL + "/qnaBanner.svg"}
            alt="hero"
            className="img-fluid"
            width="60%"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-center text-center mt-5">
          <div className="hero-section">
            <h1 className="hero-title">Ask the Doctor.</h1>
            <p className="hero-text">
                Ask a question and get a response from a doctor.
            </p>
            <Link to="/qna" className="btn btn-auth">
                Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnABanner;
