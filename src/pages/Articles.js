import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import './Article.css'
import ArticleMain from "../components/ArticleMain";
import { FaPlus } from "react-icons/fa";

const Articles = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const navigate = useNavigate();
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
                        currentUser && (currentUser.role == "Editor" || currentUser.role == "Doctor") ?
                            <div>
                                <ArticleMain textHeadline={'Read Your Best Writings Here'}>
                                    <button 
                                        className="btn-add-article"
                                        onClick={() => {
                                            navigate('/create-article');
                                        }}>
                                        <FaPlus/> <h6 style={{display: 'inline'}}>Create New Article!</h6>
                                    </button>  
                                </ArticleMain>
                            </div>
                        : 
                            <div>
                                <ArticleMain textHeadline={'Let your imagination explore.'} />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Articles;