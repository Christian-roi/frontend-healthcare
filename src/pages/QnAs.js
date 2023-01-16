import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import QnABannerDetail from "../components/QnABannerDetail";
import QnABannerMain from "../components/QnABannerMain";

const QnAs = () => {
//   const { user: currentUser } = useSelector((state) => state.auth);

//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

  return (
    <div>
      <Navbar />
      <QnABannerMain /> 
      {/* <QnABannerDetail /> => for the detail QnA Page */}
      <div className="container-fluid container-article">
        <div className="row mt-5 justify-content-start">
          <div className="col-lg-4 mt-4">
              <h2 className="p-0">Ask the Doctor!</h2>
              <nav aria-label="breadcrumb">
                  <ol className="breadcrumb navigate-menu text-start">
                      <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">QnA</li>
                  </ol>
              </nav>
          </div>
        </div>
        <div className="container">
          <div className="row mb-5 mt-3">
            <div className="col-lg-6 mx-auto">
              <div className="input-group">
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
            <div className="d-grid gap-1 col-lg-6 mx-auto">
                <button className='btn btn-create-article'>Ask the Doctor Now!</button>
            </div>
          </div>
          <div className="row">
            
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default QnAs;
