import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import ProfileBanner from "../components/ProfileBanner";
import blankProfile from "../assets/blank-profile.png";
import "./Profile.css";
import { useDispatch } from "react-redux";
import { insertImage, deleteImage } from "../redux/actions/auth";
import Swal from "sweetalert2";
import AuthService from "../services/auth";
import CardArticle from "../components/CardArticle";

let API_URL;
process.env.NODE_ENV === "development"
  ? (API_URL = process.env.REACT_APP_DEV_API_URL)
  : (API_URL = process.env.REACT_APP_API_URL);

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [user, setUser] = useState([]);

  const dataArchive = useSelector(state => state.archive).data;
  const getUser = async (id) => {
    const response = await AuthService.getCurrentUser(id);
    setUser(response.data);
  };

  useEffect(() => {
    getUser(currentUser.id);
  }, []);

  const hiddenFileInput = React.useRef(null);

  const [imageEncode, setImageEncode] = useState({
    file: null,
    base64URL: "",
  });

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        setImage(baseURL);
        resolve(baseURL);
      };
    });
  };

  // If user is not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleFileInputChange = (e) => {
    let { file } = imageEncode;

    if (e.target.files) {
      file = e.target.files[0];
    }

    getBase64(file).then((result) => {
      console.log(result);
      setImage(result);

      dispatch(insertImage(result)).then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Image has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
    });

    setImageEncode({
      file: e.target.files[0],
    });
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    dispatch(deleteImage()).then(() => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Image has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

  return (
    <>
      <Navbar />
      <ProfileBanner title="We are here to help you." />
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <div className="card my-4 border-0 shadow">
              <div className="card-body">
                <h5 className="card-title mb-4">Profile</h5>
                <div className="row justify-content-center mb-4">
                  <div className="col-lg-3 col-sm-12">
                    <img
                      src={
                        user.image ? `${API_URL}${user.image}` : blankProfile
                      }
                      alt="profile"
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-lg-6 col-sm-12 ms-3">
                    <p className="card-text">
                      Name:{" "}
                      {currentUser.first_name + " " + currentUser.last_name}
                    </p>
                    <p className="card-text">Email: {currentUser.email}</p>
                    {currentUser.role === "User" ||
                    currentUser.role === "Visitor" ? (
                      ""
                    ) : (
                      <p className="card-text">Role: {currentUser.role}</p>
                    )}
                    {user.image ? (
                      <button
                        className="btn btn-outline-danger btn-file float-start"
                        onClick={handleDeleteImage}
                      >
                        Delete Picture
                      </button>
                    ) : (
                      <span className="btn btn-outline-primary btn-file float-start">
                        Upload Picture
                        <input
                          type="file"
                          accept="image/*"
                          id="image"
                          name="image"
                          ref={hiddenFileInput}
                          onChange={(e) => {
                            handleFileInputChange(e);
                          }}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-12 my-4">
            <div className="row">
              <h4 className="text-start">Saved Article</h4>
              <hr className="mx-4" />
            </div>
            {
              dataArchive.length > 0 ? dataArchive?.map((archive) => (
                <CardArticle 
                    postId={archive.postId}
                    title={archive.post.title}
                    image={API_URL+archive.post.image}
                    content={archive.post.content}
                    isArchive={true}
                />
              )) : ""
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
