import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import './Article.css'
import ArticleMain from "../components/ArticleMain";

const Articles = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    return (
        <div>
            <Navbar />
            <div className="container-fluid container-article">
                <div className="row">
                    <div className="col-lg-4 mt-4">
                        <h2>Article Choice</h2>
                        {/* <Link to={'/'} style={{textAlign: 'left'}}>Home</Link> */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb navigate-menu">
                                <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Article Choice</li>
                            </ol>
                        </nav>
                    </div>
                    {
                        currentUser && (currentUser.role === "Editor" || currentUser.role === "Doctor") ?
                            <div>
                                <Navbar />
                                <h1>Khusus Editor</h1>
                            </div>
                        : ''
                    }
                    <ArticleMain />
                </div>
            </div>
        </div>
    )
};

export default Articles;