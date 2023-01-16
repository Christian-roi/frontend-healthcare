import React from "react";

import Navbar from "../components/Navbar"
import Banner from "../components/Banner";
import ArticleMain from "../components/ArticleMain";
import QnABanner from "../components/QnABanner";
import Footer from "../components/Footer";
import FacilityMain from "../components/FacilityMain";

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <ArticleMain textHeadline={'Explore everything that interests you.'} />
        <QnABanner image={'/qnamain.png'} />
        <FacilityMain />
        <Footer/>
    </div>
  );
};

export default Home;