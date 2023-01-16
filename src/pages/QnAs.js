import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import QnASection from "../components/QnASection";
import questionService from "../services/question";
import QnABannerMain from "../components/QnABannerMain";

const QnAs = () => {
  const [allQuestion, setAllQuestion] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  let params = {
    limit : limit,
    page: page,
    categoryId: categoryId,
    searchQuery: searchQuery
  };

  const getAllQuestions = async () => {
    questionService.getAll(params).then(res => {
      setAllQuestion(res.data.data);
    }).catch(err => console.error(err));
  };

  useEffect(() => {
    getAllQuestions();
    console.log(allQuestion)
  },[]);

  return (
    <div>
      <Navbar />
      <QnABannerMain className="banner-grey" image="/qnamain.png" /> 
      <div className="container-fluid container-article">
        <div className="row mt-3 justify-content-start">
          <div className="col-lg-4 mt-4">
              <h2 className="p-0">Ask the Doctor!</h2>
              <nav aria-label="breadcrumb">
                  <ol className="breadcrumb navigate-menu text-start">
                      <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">QnA</li>
                  </ol>
              </nav>
          </div>
        </div>
        <div className="container">
          <div className="row mb-5 mt-3">
            <div className="col-lg-6 mx-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for articles and QnA"
                  aria-label="Search for articles and QnA"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
            <div className="d-grid gap-1 col-lg-6 mx-auto">
                <button className='btn btn-create-article'>Ask the Doctor Now!</button>
            </div>
          </div>
          <div className="row">
            {
              allQuestion.length > 0 ? allQuestion.map((question) => (
                  <QnASection 
                    fullName={question.fullName} 
                    title={question.title} 
                    content={question.content} 
                    createdAt={question.createdAt} 
                    bgColor={{backgroundColor: '#F4F4F4'}} 
                  >
                    <h5 className="view-replies pb-2">View {question.answers} replies</h5>
                  </QnASection>
              )) : ''
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default QnAs;
