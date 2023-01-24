import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import './Article.css'
import ArticleMain from "../components/ArticleMain";
import { FaPlus } from "react-icons/fa";
import Footer from "../components/Footer";
import postService from "../services/post";
import CardArticle from "../components/CardArticle";
import Swal from "sweetalert2";

let API_URL;
process.env.NODE_ENV === 'development' ?
    API_URL = process.env.REACT_APP_DEV_API_URL : API_URL = process.env.REACT_APP_API_URL
const Articles = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const isEditorOrDoctor = currentUser && ["Editor","Doctor"].includes(currentUser.role);
    const dataCategories = useSelector(state => state.category).data;
    const dataArchive = useSelector(state => state.archive).data;
  
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
                    setAllPost(res.data.data)
                    setNoData(true);
                } else {
                    const newPage = page + 1;
                    const newList = allPost.concat(res.data.data);
                    setAllPost(newList);    
                    setPage(newPage);
                    if (res.data.data.length === 0) {
                        setNoData(true);
                    }
                }
            }).catch((err) => { 
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: err
                });
            }).finally(() => {
                setLoading(false);
            })
        }, 1000)
    }

    useEffect(() => {
        getAllPosts();
    }, [categoryId , limit]);

    const getByCategory =  useCallback((id) => {
        setCategoryId(id);
        setPage(null);
        setLimit(null);
        getAllPosts()
    },[])

    return (
        <div>
            <Navbar />
            <div className="container-fluid container-article">
                <div className="row">
                    <div className="col-lg-4 mt-4">
                        <h2>Article Choice</h2>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb navigate-menu">
                                <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Article Choice</li>
                            </ol>
                        </nav>
                    </div>
                    {
                        isEditorOrDoctor ?
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
                        <div className="col-lg-8 order-lg-1 order-2">
                            <h2 style={{textAlign:'left'}}>Water your mind.</h2>
                            {
                                allPost ? allPost?.map((post) => (
                                    <CardArticle 
                                        postId={post.id} 
                                        title={post.title} 
                                        image={API_URL+post.image} 
                                        content={post.content} 
                                        isArchive={dataArchive && dataArchive.find(da => da.postId === post.id) !== undefined ? true : false}
                                    />
                                )) : ""
                            }
                            {loading ?  <div className="text-center">loading data ...</div> : "" }
                            {noData ? <div className="text-center">no data anymore ...</div> : "" } 
                        </div>
                        <div className="col-lg-4 order-lg-2 order-1">
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