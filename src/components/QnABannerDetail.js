import React from "react";
import "./Banner.css";
import "./Navbar.css";
import "./QnABanner.css";
import { Link } from "react-router-dom";

const QnABannerDetail = () => {
  return (
    <div className="container banner-qnamain">
      <div className="row pt-3">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-center text-center">
          <img
            src={process.env.PUBLIC_URL + "/qnadetail.png"}
            alt="hero"
            className="img-fluid"
            width="60%"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-center text-center mt-5">
          <div className="hero-section mt-5">
            <h1 className="hero-title">Ask the Doctor.</h1>
            <p className="hero-text">
              Ask a question and get a response from a doctor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnABannerDetail;
