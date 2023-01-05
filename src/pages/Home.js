import React from "react";

import Navbar from "../components/Navbar"
import Banner from "../components/Banner";
import Article from "../components/Article";
import QnABanner from "../components/QnABanner";

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <Article />
        <QnABanner />
        {/* Show user logged in */}
    </div>
  );
};

export default Home;