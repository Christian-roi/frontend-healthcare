import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegBookmark, FaShare } from 'react-icons/fa';
import { fetchCategories } from '../redux/actions/category';
import randomImage from '../assets/blank-profile.png';
import './ArticleMain.css';
import postService from '../services/post';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8000/';
const ArticleMain = ({textHeadline,children}) => {
    const categories = useSelector(state => state.category);
    const dataCategories = categories.data;
    const dispatch = useDispatch();

    const [categoryId, setCategoryId] = useState(null);

    const params = {
      limit: 5,
      categoryId: categoryId
    }

    const [allPost, setAllPost] = useState([]);
    const getAllPosts = async () => {
      postService.getAll(params).then(res => {
        setAllPost(res.data);
      }).catch(err => console.error(err));
    };

    useEffect(() => {
        dispatch(fetchCategories());
        getAllPosts();
    }, [dispatch]);

    const posts = allPost.data;

    // console.log("INI CATEGORY",categories);
    const getByCategory = id => {
      setCategoryId(id);
      getAllPosts()
    }

    return (
        <div className="main-article">
            <h2 className="mt-5">{textHeadline}</h2>
            {children}
            <ul className='list-inline mt-4'>
                {
                    dataCategories && dataCategories.slice(0,5).map((category) => (
                        <li 
                            key={category.id}
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
                          <div className="card h-100" key={post.id}>
                            <img src={API_URL+post.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                              <h5 className="card-title big-card">
                                <Link to={'/detail-article/'+post.id}>
                                  {post.title}
                                </Link>
                              </h5>
                              <p className="card-text">
                                <div 
                                    className='post-thumb'
                                    dangerouslySetInnerHTML={{__html: post.content.substring(0,70)+"<p>....</p>"}}
                                />
                                <Link to={'/detail-article/'+post.id} className="read-more">
                                  Read More
                                </Link>
                                <div className='icon-card'>
                                  <div className="row justify-content-between">
                                    <div className="col-4"><FaRegBookmark/> Save</div>
                                    <div className="col-2" style={{textAlign: 'right'}}><FaShare/> </div>
                                  </div>                              
                                </div>
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
                                <div className="card h-100" key={post.id}>
                                  <img src={API_URL+post.image} className="card-img-top" alt="..."/>
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      <Link to={'/detail-article/'+post.id}>
                                        {post.title}
                                      </Link>
                                    </h5>
                                    <p className="card-text">
                                      <div 
                                        className='post-thumb'
                                        dangerouslySetInnerHTML={{__html: post.content.substring(0,70)+"<p>....</p>"}}
                                      />
                                      <Link to={'/detail-article/'+post.id} className="read-more">
                                        Read More
                                      </Link>
                                      <div className='icon-card'>
                                        <div className="row justify-content-between">
                                          <div className="col-4"><FaRegBookmark/> Save</div>
                                          <div className="col-2" style={{textAlign: 'right'}}><FaShare/> </div>
                                        </div>                              
                                      </div>
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