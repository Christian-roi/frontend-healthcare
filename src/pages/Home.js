import React from "react";

import Navbar from "../components/Navbar"
import Banner from "../components/Banner";
import ArticleMain from "../components/ArticleMain";
import QnABanner from "../components/QnABanner";
import Footer from "../components/Footer";
import FacilityMain from "../components/FacilityMain";
import { AboutUs } from "../components/AboutUs";

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <ArticleMain textHeadline={'Explore everything that interests you.'} />
        <QnABanner image={'/qnamain.png'} className={'banner-qna'} />
        {/* <FacilityMain /> */}
        <AboutUs />
        <Footer/>
    </div>
  );
};

export default Home;