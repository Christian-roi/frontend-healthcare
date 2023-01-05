import React from "react";

import Navbar from "../components/Navbar"
import Banner from "../components/Banner";
import ArticleMain from "../components/ArticleMain";

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <ArticleMain />
    </div>
  );
};

export default Home;