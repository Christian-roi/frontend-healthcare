import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import ProfileBanner from "../components/ProfileBanner";

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
            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title">Profile</h5>
                <p className="card-text">Name: {currentUser.first_name + " " + currentUser.last_name}</p>
                <p className="card-text">Email: {currentUser.email}</p>
                <p className="card-text">Role: {currentUser.role}</p>
                <Link to="/update-profile" className="btn btn-primary">
                  Update Profile
                </Link>
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
