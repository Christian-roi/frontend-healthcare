import { useEffect, useState } from "react";
import { FaBookmark, FaCircle, FaRegBookmark, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import postService from "../services/post";
import commentService from "../services/comment";
import blankProfile from "../assets/blank-profile.png";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { addComment } from "../redux/actions/comment";
import AuthService from "../services/auth";
import { actionArchive } from "../redux/actions/acrhive";
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";

let API_URL;
process.env.NODE_ENV === 'development' ?
    API_URL = process.env.REACT_APP_DEV_API_URL : API_URL = process.env.REACT_APP_API_URL
const DetailArticle = () => {
  const dispatch = useDispatch();
  const data = {};
  const [currentPost, setCurrentPost] = useState(data);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const params = useParams();

    const [user, setUser] = useState([]);

    const getUser = async (id) => {
      const response = await AuthService.getCurrentUser(id);
      setUser(response.data);
    };

  const { user: currentUser } = useSelector((state) => state.auth);
  const dataArchive = useSelector(state => state.archive).data;

  const [showUnauthorized, setShowUnauthorized] = useState(false);
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const getCommentByPostId = async (id) => {
    commentService.getByPostId(id).then((res) => {
      setComments(res.data.data);
    });
  };

  const OnChangeComment = (e) => {
    const comment = e.target.value;
    setComment(comment);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Comment can't be empty!",
      });
    } else {
      const data = {
        userId: currentUser.id,
        comment: comment,
      };

      const id = parseInt(params.id);
      commentService.create(id, data).then((res) => {
        setComment("");
        getCommentByPostId(params.id);
        // Swal without ok button
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Comment has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        // make timeout to show alert success
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
    }
  };

  const handleDeleteComment = (id) => {
    commentService.deleteComment(id).then((res) => {
      getCommentByPostId(params.id);
      // Swal without ok button
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Comment has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
      // make timeout to show alert success
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

  const getPost = async (id) => {
    postService
      .get(id)
      .then((res) => {
        setCurrentPost(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: err
        });
      });
  };

  useEffect(() => {
    getPost(params.id);
    getCommentByPostId(params.id);
    if (currentUser) {
      getUser(currentUser.id);
    }
  }, [params.id]);

  const messageUnauthorization = () => {
    Swal.fire({
      icon: 'error',
      title: 'Unauthorization',
      text: 'You must logged In to use this feature',
      footer: '<a href="/login">Click here to login</a>'
    })
  }
  
  const handleSaveArticle = () => {
    const dataArchive = {
      userId: currentUser.id,
      postId: params.id
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

  const actionSaveArticleButton = () => {
    currentUser ? handleSaveArticle() : setShowUnauthorized(true)
  };


  const changeFormatDate = (createdAt) => {
    let date = new Date(createdAt);
    return date.toDateString();
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid container-article">
        <div className="row">
          <div className="col-lg-4 mt-4">
            <h2>Article Choice</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb navigate-menu">
                <li className="breadcrumb-item">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={"/articles"}>Article Choice</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Article
                </li>
              </ol>
            </nav>
          </div>
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
          {currentPost.data ? (
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <img
                      src={API_URL + currentPost.data.image}
                      className="img-fluid"
                      style={{ width: "100%" }}
                      alt="cover article"
                    />
                  </div>
                </div>
                <div className="row justify-content-end mt-4 mb-4">
                  <div
                    className="col-lg-10 col-10"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      src={ currentPost.data.user.image ? API_URL + currentPost.data.user.image : blankProfile}
                      className="rounded-circle float-start"
                      width="50"
                      height="50"
                      alt="avatar the writer"
                    />
                    <div className="row">
                      <div className="col align-self-start">
                        <h5>
                          {currentPost.data.user.first_name +
                            " " +
                            currentPost.data.user.last_name}
                        </h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 align-self-start post-detail-description">
                        <p>
                          {currentPost.data.category.name} <FaCircle className="ms-1 me-1"/>{" "}
                          {changeFormatDate(currentPost.data.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <span onClick={actionSaveArticleButton} className="link">
                      {
                         dataArchive && dataArchive.find(da => da.postId === currentPost.data.id) !== undefined 
                          ? <><FaBookmark className="app-purple-color ms-1 me-1"/> Saved</>  
                          : <><FaRegBookmark className="ms-1 me-1"/> Save</>   
                      }
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 mt-1 mb-2">
                    <h4 style={{ textAlign: "left", fontSize: "2rem" }}>
                      {currentPost.data.title}
                    </h4>
                    <div
                      className="content-detail-post"
                      dangerouslySetInnerHTML={{
                        __html: currentPost.data.content,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="container">
                <div class="card card-comments border-dark mt-3">
                  <h5 class="card-header text-start">Comments</h5>
                  <div class="card-body">
                    {currentUser ? (
                      <>
                        <div className="row justify-content-start mb-4">
                          <div
                            className="col-lg-10 col-10"
                            style={{ textAlign: "left" }}
                          >
                            <img
                              src= {user.image ? API_URL + user.image : blankProfile}
                              className="rounded-circle float-start"
                              width="50"
                              height="50"
                              alt="avatar the writer"
                            />
                            <div className="row">
                              <div className="col align-self-start justify-content-center pt-3">
                                <h5>
                                  {currentUser.first_name +
                                    " " +
                                    currentUser.last_name}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row justify-content-start mb-4">
                          <div className="col-lg-10 col-10">
                            <form className="row g-3" onSubmit={handleComment}>
                              <div className="form-floating">
                                <textarea
                                  className="form-control"
                                  placeholder="Leave a comment here"
                                  id="floatingTextarea2"
                                  style={{ height: "100px" }}
                                  name="comment"
                                  onChange={OnChangeComment}
                                  value={comment}
                                ></textarea>
                                <label for="floatingTextarea2" className="ms-2">
                                  Leave a comment here...
                                </label>
                              </div>
                              <div className="col-12 text-start">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Comment
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <hr />
                      </>
                    ) : (
                      <div className="row justify-content-start my-2">
                        <div className="col-lg-12 col-12">
                          <p>
                            {" "}
                            Please{" "}
                            <Link
                              to="/login"
                              className="btn btn-outline-primary"
                            >
                              Login
                            </Link>{" "}
                            to comment
                          </p>
                        </div>
                        <hr />
                      </div>
                    )}
                    <div className="row justify-content-start mb-4">
                      <div className="col-lg-12 col-12">
                        {currentPost.data.comments.map((comment) => {
                          return (
                            <div className="card card-comments border-dark mt-3">
                              <div className="card-body">
                                <div className="row justify-content-end mt-4 mb-4">
                                  <div
                                    className="col-lg-10 col-10"
                                    style={{ textAlign: "left" }}
                                  >
                                    <img
                                      src={comment.user.image ? API_URL + comment.user.image : blankProfile}
                                      className="rounded-circle float-start"
                                      width="50"
                                      height="50"
                                      alt="avatar the writer"
                                    />
                                    <div className="row">
                                      <div className="col-lg-3 align-self-start">
                                        <h5>
                                          {comment.user.first_name +
                                            " " +
                                            comment.user.last_name}
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-3 align-self-start post-detail-description">
                                        <p>
                                          {changeFormatDate(comment.createdAt)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-12">
                                        <p>{comment.comment}</p>
                                      </div>
                                    </div>
                                  </div>
                                  {currentUser &&
                                  currentUser.id === comment.user.id ? (
                                    <div className="col-2">
                                      <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                          handleDeleteComment(comment.commentId)
                                        }
                                      >
                                        {" "}
                                        <FaTrash className="ms-1 me-1" />{" "}
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="col-2"></div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {currentPost.data.comments.length === 0 ? (
                          <div className="row justify-content-start mb-4">
                            <div className="col-lg-12 col-12">
                              <p>There is no comment yet</p>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailArticle;
