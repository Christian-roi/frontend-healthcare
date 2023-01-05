import React from "react";
import "./Banner.css";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="container banner-bg">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-start text-start mt-5">
          <div className="hero-section">
            <h3 className="hero-title mb-2">
              #1 Health articles and Qna Platform.
            </h3>
            <p className="hero-text mb-5">
              Read, ask, and do your own research.
            </p>
            <div className="input-group w-75 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search for articles and QnA"
                aria-label="Search for articles and QnA"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-end text-end">
          <img
            src={process.env.PUBLIC_URL + "/banner2.svg"}
            alt="hero"
            className="img-fluid"
            width="60%"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
