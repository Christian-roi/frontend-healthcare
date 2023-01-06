import React from "react";

import Navbar from "../components/Navbar"
import Banner from "../components/Banner";
import ArticleMain from "../components/ArticleMain";
import QnABanner from "../components/QnABanner";

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <ArticleMain />
        <QnABanner />
        {/* Show user logged in */}
    </div>
  );
};

export default Home;