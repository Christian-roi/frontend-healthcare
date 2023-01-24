import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookmark, FaRegBookmark, FaShare } from 'react-icons/fa';
import { fetchCategories } from '../redux/actions/category';
import './ArticleMain.css';
import postService from '../services/post';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { actionArchive, fetchArchives } from '../redux/actions/acrhive';
import { Toast, ToastBody, ToastContainer, ToastHeader } from 'react-bootstrap';

let API_URL;
process.env.NODE_ENV === 'development' ?
    API_URL = process.env.REACT_APP_DEV_API_URL : API_URL = process.env.REACT_APP_API_URL
const ArticleMain = ({textHeadline,children}) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const userId =  useMemo(() => currentUser?.id ?? 0, [currentUser?.id]);
    const dataCategories = useSelector(state => state.category).data;const dataArchive = useSelector(state => state.archive).data;

    const dispatch = useDispatch();

    const [categoryId, setCategoryId] = useState(null);
    
    const [showUnauthorized, setShowUnauthorized] = useState(false);
    const [notification, setNotification] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(null);
  
    const params = {
      limit: 5,
      categoryId: categoryId
    }

    const [allPost, setAllPost] = useState([]);
    const getAllPosts = async () => {
      postService.getAll(params).then(res => {
        setAllPost(res.data.data);
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: err
        });
      });
    };

    const paramsArchive = {
      userId
    }

    useEffect(() => {
        dispatch(fetchCategories());
        getAllPosts();
        if(userId !== 0) {
          dispatch(fetchArchives(paramsArchive))
        }
    }, [dispatch, categoryId]);

    const getByCategory = id => {
      setCategoryId(id);
      getAllPosts()
    };

    const messageUnauthorization = () => {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorization',
        text: 'You must logged In to use this feature',
        footer: '<a href="/login">Click here to login</a>'
      })
    }

    const handleSaveArticle = (postId) => {
      const dataArchive = {
        userId,
        postId,
      }
      dispatch(actionArchive(dataArchive)).then((data) => {
        setMessage(data.message);
        setSuccess(true);
      }).catch((err) => {
        setMessage(err.response.data.message);
        setSuccess(false);
      }).finally(() => {
        setNotification(true);
      })
    };

    const actionSaveArticleButton = (id) => {
      userId === 0 ? setShowUnauthorized(true) : handleSaveArticle(id)
    };

    let url = "https://healthhub.vercel.app/detail-article/" + allPost[0]?.id;

    const Share = () => {
      if (navigator.share) {
        navigator
          .share({
            title: "Web Share API Demo",
            text: "Check out Web Share API!",
            url: url,
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      } else {
        alert("Web Share API is not supported.");
      }
    };


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
            {
              showUnauthorized && ( messageUnauthorization() )
            }
            {
              notification && (
                <ToastContainer position="top-end" className="position-fixed p-3">
                  <Toast bg={success ? 'info' : 'danger'} onClose={() => setNotification(false)} show={notification} delay={3000} autohide>
                    <ToastHeader><strong className="me-auto">{success ? 'Success' : 'Failed'}</strong></ToastHeader>
                    <ToastBody>{message}</ToastBody>
                  </Toast>
                </ToastContainer>
              )
            }
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 '>
                      {
                        allPost.length > 0 ? allPost.slice(0,1)?.map((post) => (
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
                                    <div className="col-4 link">
                                      <span onClick={() => actionSaveArticleButton(post.id)}>
                                        { 
                                          dataArchive && dataArchive.find(da => da.postId === post.id) !== undefined 
                                          ? <FaBookmark className="app-purple-color"/>
                                          : <FaRegBookmark/> 
                                        }
                                         Save
                                      </span>
                                    </div>
                                    <div className="col-2 link" style={{textAlign: 'right'}}><FaShare onClick={Share}/></div>
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
                            allPost.length > 0 ? allPost.slice(1)?.map((post) => (
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
                                          <div className="col-4 link">
                                            <span onClick={() => actionSaveArticleButton(post.id)}>
                                              { 
                                                dataArchive && dataArchive.find(da => da.postId === post.id) !== undefined 
                                                ? <FaBookmark className="app-purple-color"/>
                                                : <FaRegBookmark/> 
                                              }
                                              Save
                                            </span>
                                          </div>
                                          <div className="col-2 link" style={{textAlign: 'right'}}><FaShare onClick={Share}/></div>
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