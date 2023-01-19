import React from "react";
import "./Banner.css";

export const AboutUs = () => {
  return (
    <section>
      <div className="container banner-bg py-5">
        <div className="row py-2">
          <div className="col-6 justify-content-start text-start">
            <h1 className="about-us-title">About Us</h1>
            <p className="about-us-text text-justify">
              HealthHub is a platform that provides provides health care
              articles that can give you much information about health, and this
              website provides QnA with Doctor service and gives you information
              about nearby hospitals.
            </p>
          </div>
          <div className="col-6 justify-content-center text-center align-self-center">
            <img
              src={process.env.PUBLIC_URL + "/LogoHealthHub.png"}
              alt="about us"
              width="50%"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
