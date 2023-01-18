import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import ProfileBanner from "../components/ProfileBanner";
import blankProfile from "../assets/blank-profile.png";
import './Profile.css';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  // If user is not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <ProfileBanner />
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="card mt- border-0 shadow">
              <div className="card-body">
                <h5 className="card-title mb-4">Profile</h5>
                <div className="row justify-content-center mb-4">
                  <div className="col-md-3 col-sm-12">
                    {currentUser.image ? (
                      <img src={currentUser.image} className="img-fluid" />
                    ) : (
                      <img src={blankProfile} className="img-fluid" />
                    )}
                  </div>
                  <div className="col-md-6 col-sm-12 ms-5">
                    <p className="card-text">
                      Name:{" "}
                      {currentUser.first_name + " " + currentUser.last_name}
                    </p>
                    <p className="card-text">Email: {currentUser.email}</p>
                    {currentUser.role === "User" || currentUser.role==="Visitor" ? (
                      "") : (
                        <p className="card-text">Role: {currentUser.role}</p>
                      )}
                    <span className="btn btn-outline-primary btn-file float-start">
                      Upload Picture<input type="file"/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
