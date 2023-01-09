import React from "react";

import Navbar from "../components/Navbar"
import Banner from "../components/Banner";
import Article from "../components/Article";
import QnABanner from "../components/QnABanner";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <Article />
        <QnABanner />
        <Footer/>
    </div>
  );
};

export default Home;