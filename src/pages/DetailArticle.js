import { useEffect, useState } from "react";
import { FaCircle, FaRegBookmark } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import postService from "../services/post";
import blankProfile from "../assets/blank-profile.png";
import Footer from "../components/Footer";

const API_URL = "http://localhost:8000/";
const DetailArticle = () => {
  const data = {};
  const [currentPost, setCurrentPost] = useState(data);
  const params = useParams();

  const getPost = async (id) => {
    postService
      .get(id)
      .then((res) => {
        setCurrentPost(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPost(params.id);
  }, [params.id]);

  // console.log("ARticle",currentPost)
  // let date = new Date();
  // let getCreatedAt = date.toDateString();
  // if (currentPost) {
  //     date = new Date(currentPost.data.createdAt);
  //     getCreatedAt = date.toDateString();
  // }
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
                      src={blankProfile}
                      className="rounded-circle float-start"
                      width="50"
                      height="50"
                      alt="avatar the writer"
                    />
                    <div className="row">
                      <div className="col-lg-3 align-self-start">
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
                          {currentPost.data.category.name} <FaCircle />{" "}
                          {changeFormatDate(currentPost.data.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <FaRegBookmark className="ms-1 me-1" />
                    Save
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
                <div className="row">
                  <div className="col-lg-12 justify-content-start text-start mt-5">
                    <h4>Comments</h4>
                  </div>
                  <hr />
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="card bg-secondary">
                      <div className="card-header">
                        <div className="row justify-content-start mt-4 mb-4">
                          <div
                            className="col-lg-10 col-10"
                            style={{ textAlign: "left" }}
                          >
                            <img
                              src={blankProfile}
                              className="rounded-circle float-start"
                              width="50"
                              height="50"
                              alt="avatar the writer"
                            />
                            <div className="row">
                              <div className="col-lg-3 align-self-start">
                                <h5>
                                  {currentPost.data.user.first_name +
                                    " " +
                                    currentPost.data.user.last_name}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <form className="form-group justify-content-start text-start">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Write a comment..."
                          />
                          <button
                            type="submit"
                            className="btn btn-primary mt-2"
                          >
                            Submit
                          </button>
                        </form>
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
