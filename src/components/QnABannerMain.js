import React from "react";
import "./Banner.css";
import "./Navbar.css";
import "./QnABanner.css";

const QnABannerMain = (props) => {
  return (
    <div className={`container ${props.className}`}>
      {/*
            props for banner color grey = "banner-grey"  
         */}
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-center text-center">
          <img
            src={process.env.PUBLIC_URL + `${props.image}`}
            // for main qna = "/qnamain.png" and for qna detail = "/qnadetail.png"
            alt="hero"
            className="img-fluid"
            width="60%"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-center text-center mt-3">
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

export default QnABannerMain;
