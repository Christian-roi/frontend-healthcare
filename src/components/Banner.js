import React from "react";
import "./Banner.css";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div
            className="card text-bg-light"
            style={{ border: "none", borderRadius: "0px" }}
          >
            <img
              src={process.env.PUBLIC_URL + "/Banner.svg"}
              className="card-img"
            //   width="100%"
              alt="banner"
            />
            <div className="card-img-overlay">
              <div className="container">
                <div className="row">
                  <div className="col-6 d-flex flex-column mt-5" style={{textAlign: "left"}}>
                    <h1 className="card-title">#1 Health articles and Qna Platform.</h1>
                    <p className="card-text">Read, ask, and do your own research. </p>
                    {/* Make search bar with icon */}
                    <div className="input-group mb-3 w-50 mt-4">
                        <input type="text" className="form-control form-control-lg" placeholder="Search articles..." aria-label="Search" aria-describedby="button-addon2"/>
                        <button className="btn btn-light" type="button" id="button-addon2" style={{border: "none"}}>
                            <FaSearch />
                        </button>
                    </div>
                  </div>
                  <div className="col-6">
                    <img src={process.env.PUBLIC_URL + "/banner2.svg"} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
