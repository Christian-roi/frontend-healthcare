import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const QnAs = () => {
//   const { user: currentUser } = useSelector((state) => state.auth);

//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

  return (
    <div>
      <Navbar />
      <h1>QnA Disini</h1>
    </div>
  );
};

export default QnAs;
