import React from "react";

import Navbar from "../components/Navbar"
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        {/* Show user logged in */}
    </div>
  );
};

export default Home;