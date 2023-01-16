import React, { useState } from "react";
import "./Banner.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const textForSearch = "Search for articles";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearchQuery(search);
  };

  const handleSearch = () => {
    navigate('/articles',{state:{searchQuery: searchQuery}});
  };

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
                placeholder={textForSearch}
                aria-label={textForSearch}
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={onChangeSearch}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 justify-content-end text-center">
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
