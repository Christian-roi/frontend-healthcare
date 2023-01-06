import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegBookmark } from 'react-icons/fa'
import { fetchCategories } from '../redux/actions/category';
import randomImage from '../assets/blank-profile.png';
import './ArticleMain.css';
import postService from '../services/post';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8000/';
const ArticleMain = () => {
    const categories = useSelector(state => state.category);
    const data_categories = categories.data;
    const dispatch = useDispatch();

    const [allPost, setAllPost] = useState([]);
    const getAllPosts = async () => {
      postService.getAll().then(res => {
        setAllPost(res.data);
      }).catch(err => console.error(err));
    };

    useEffect(() => {
        dispatch(fetchCategories());
        getAllPosts();
    }, [dispatch]);

    const posts = allPost.data

    // console.log("INI CATEGORY",categories);
    const getByCategory = id => {
        console.log("Category ID: ",id)
    }

    return (
        <div className="main-article">
            <h2 className="mt-5">Explore everything that interests you.</h2>
            <ul className='list-inline mt-4'>
                {
                    data_categories && data_categories.map((category, index) => (
                        <li 
                            key={index}
                            className='list-inline-item mx-2'    
                        >
                            <h5 
                                onClick={() => getByCategory(category.id)}
                                className='list-category'
                            >
                                {category.name}
                            </h5>
                        </li>
                    ))
                }
            </ul>
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 '>
                      {
                        posts ? posts.slice(0,1)?.map((post) => (
                          <div className="card h-100">
                            <img src={API_URL+post.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                              <h5 className="card-title big-card">
                                <Link to={'/detail-article/'+post.id}>
                                  {post.title}
                                </Link>
                              </h5>
                              <p className="card-text">
                                <div 
                                    dangerouslySetInnerHTML={{__html: post.content}}
                                />
                              </p>
                            </div>
                          </div>
                        )) : ''
                      }
                    </div>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 '>
                        <div className='row row-cols-1 row-cols-md-2 g-4'>
                          {
                            posts ? posts.slice(1)?.map((post) => (
                              <div className="col">
                                <div className="card h-100">
                                  <img src={API_URL+post.image} className="card-img-top" alt="..."/>
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      <Link to={'/detail-article/'+post.id}>
                                        {post.title}
                                      </Link>
                                    </h5>
                                    <p className="card-text">
                                      <div 
                                        dangerouslySetInnerHTML={{__html: post.content}}
                                      />
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )) : ''
                          }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ArticleMain;