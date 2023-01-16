import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import './Article.css'
import ArticleMain from "../components/ArticleMain";
import { FaPlus } from "react-icons/fa";
import Footer from "../components/Footer";
import postService from "../services/post";
import CardArticle from "../components/CardArticle";

const API_URL = 'http://localhost:8000/';
const Articles = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dataCategories = useSelector(state => state.category).data;
    
    const navigate = useNavigate();
    const location = useLocation();

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    const [categoryId, setCategoryId] = useState(null);
    const [limit, setLimit] = useState(1);

    let params = {
        limit : limit,
        page: page,
        categoryId: categoryId,
        searchQuery: location.state ? location.state.searchQuery : null
    }

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            if(!noData) {
                getAllPosts();
            }
        }
    }

    const [allPost, setAllPost] = useState([]);
    const getAllPosts =  () => {
        setLoading(true);
        setTimeout(() => {
            postService.getAll(params).then((res) => {
                if (categoryId) {
                    // console.log("PAGE : ",page)
                    // console.log("Limit : ",limit)
                    // console.log("ALL POST : ",allPost)
                    // console.log("Category : ",categoryId)
                    setPage(null);
                    setLimit(null);
                    // const newPage = page + 1;
                    // console.log(newPage)
                    // const thePost = res.data.data;
                    setAllPost(res.data.data) 
                    // setPage(newPage)
                    if (res.data.data.length === 0) {
                        setNoData(true);
                    }
                } else {
                    // console.log("SEMUA",allPost)
                        const newPage = page + 1;
                    const newList = allPost.concat(res.data.data);
                    setAllPost(newList);    
                    // console.log(newList)
                    setPage(newPage);
                    if (res.data.data.length === 0) {
                        setNoData(true);
                    }
                }
            }).catch((err) => { 
                console.error(err)
            }).finally(() => {
                setLoading(false);
            })
        }, 1000)
    }

    useEffect(() => {
        getAllPosts();
    }, []);

    // MASIH ADA BUG
    const getByCategory = id => {
        setCategoryId(id);
        getAllPosts()
    }

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
                    <div className="col-10 mx-auto">
                        <hr/>
                    </div>
                </div>
                <div className="container">                    
                    <div className="row mt-5">
                    {
                        location.state && location.state.searchQuery ?
                            <h4>Result : {location.state.searchQuery}</h4>
                            :
                            ''
                    }
                        <div className="col-lg-8">
                            <h2 style={{textAlign:'left'}}>Water your mind.</h2>
                            {
                                allPost ? allPost?.map((post) => (
                                    <CardArticle 
                                        postId={post.id} 
                                        title={post.title} 
                                        image={API_URL+post.image} 
                                        content={post.content} 
                                    />
                                )) : ""
                            }
                            {loading ?  <div className="text-center">loading data ...</div> : "" }
                            {noData ? <div className="text-center">no data anymore ...</div> : "" } 
                        </div>
                        <div className="col-lg-4">
                            <h2 style={{textAlign:'left'}}>Discover more</h2>
                            <ul className='list-inline mt-4'>
                                {
                                    dataCategories && dataCategories.map((category) => (
                                        <li 
                                            key={category.id}
                                            className='list-inline-item mx-2'    
                                        >
                                            <h5 
                                                onClick={() => getByCategory(category.id)}
                                                className='list-discover'
                                            >
                                                {category.name}
                                            </h5>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Articles;