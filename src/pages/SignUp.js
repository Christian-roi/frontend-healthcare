import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import signUpImage from "../assets/signUpImage.png";
import AuthLayout from "../components/AuthLayout";
import Swal from "sweetalert2";

import { register } from "../redux/actions/auth";

const SignUp = () => {
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();

  const [typePassword, setTypePassword] = useState("password");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const Eye = () => {
    if (typePassword === "password") {
      setTypePassword("text");
      setEye(false);
    } else {
      setTypePassword("password");
      setEye(true);
    }
  };

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the fields!",
      });
      return;
    } else {
      dispatch(register(firstName, lastName, email, password))
        .then(() => {
          setSuccess(true);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Your account has been created!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
          });
          setSuccess(false);
        });
    }
  };

  return (
    <AuthLayout
      image={signUpImage}
      textAuth={"Already have an account? "}
      linkAuth={"/login"}
      linkText={"Sign In"}
    >
      <div className="row form-auth">
        <h2 className="landing-text">Your exploration begins here.</h2>
        {!success && (
          <form className="mt-4">
            <div className="row row-name g-2">
              <input
                type="text"
                className="col me-1"
                placeholder="First Name"
                name="firstName"
                required
                onChange={onChangeFirstName}
                value={firstName}
              />
              <input
                type="text"
                className="col ms-1"
                placeholder="Last Name"
                name="lastName"
                required
                onChange={onChangeLastName}
                value={lastName}
              />
            </div>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              onChange={onChangeEmail}
              value={email}
            />
            <div className="input-group">
              <input
                type={typePassword}
                placeholder="Password"
                name="password"
                className="form-control"
                required
                onChange={onChangePassword}
              />
              <span className="input-group-text" onClick={Eye} style={{cursor:'pointer'}}>
                {eye ? <FaEye/> : <FaEyeSlash/>}
              </span>
            </div>
            <button
              className="btn-auth mt-4 auth-action"
              style={{ fontWeight: "700" }}
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            {/* <p className="text-or mt-2 mb-2">
              <span>Or</span>
            </p> */}
            {/* <button className="btn-auth-google mt-4">
              <img
                width="20px"
                style={{ marginBottom: "3px", marginRight: "5px" }}
                alt="Google sign-in"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
              Sign Up With Google
            </button> */}
          </form>
        )}

        {/* {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )} */}
      </div>
    </AuthLayout>
  );
};

export default SignUp;
