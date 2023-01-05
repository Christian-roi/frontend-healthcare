import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Articles = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (currentUser && currentUser.role === "Editor" || currentUser.role === "Doctor") {
    return (
        <div>
            <Navbar />
            <h1>Khusus Editor</h1>
        </div>
    )
  }

  return (
    <div>
      <Navbar />
        <h1>Artikel untuk User</h1>
    </div>
  );
};

export default Articles;
