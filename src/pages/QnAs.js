import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import QnASection from "../components/QnASection";
import questionService from "../services/question";
import QnABannerMain from "../components/QnABannerMain";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import Swal from "sweetalert2";


const QnAs = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dataCategories = useSelector(state => state.category).data;
  
  const textForSearch = "Search for QnA";
  
  const [allQuestion, setAllQuestion] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [keyword, setKeyword] = useState("");

  let params = {
    limit : limit,
    page: page,
    categoryId: categoryId,
    searchQuery: searchQuery
  };

  const getAllQuestions = async () => {
    questionService.getAll(params).then(res => {
      setAllQuestion(res.data.data);
      setPage(res.data.page);
      setPages(res.data.totalPage);
      setRows(res.data.totalRows);
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: err
      });
    });
  };

  useEffect(() => {
    getAllQuestions();
  },[page, searchQuery, categoryId]);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const onChangeCategoryId  = e => {
    setCategoryId(e.target.value);
  };

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const searchData = () => {
    setPage(0);
    setSearchQuery(keyword);
  };

  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => { 
    currentUser ? setShow(true) : navigate('/login');
  };

  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState('');
  const userId =  useMemo(() => currentUser?.id ?? 0, [currentUser?.id]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };
  
  const onChangeContent = e => {
    setContent(e.target.value);
  };

  const [success, setSuccess] = useState(false);
  const dataQuestion = {
      userId,
      categoryId,
      title,
      content
  };

  const handleCreateQuestion = () => {
    questionService.create(dataQuestion).then((res) => {
      handleClose()
      setTitle('');
      setContent('');
      setCategoryId(null)
      setMessage(res.data.message);
      setSuccess(true);
    }).catch((error) => {
      setMessage(error.data.message);
      setSuccess(false);
    }).finally(() => {
      setNotification(true);
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleCreateQuestion();
};

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
          <div className="d-grid gap-2 col-lg-4 col-sm-10 mx-auto">
            <button className='btn btn-create-article' onClick={handleShow}>Ask the Doctor Now!</button>
          </div>
          <div className="row mb-4 mt-2 filter-search-qna">
            <div className="col-lg-6 mt-2">
              <select onChange={onChangeCategoryId} className="form-select">
                  <option value='' selected>All Category</option>
                  {
                      dataCategories && dataCategories.map((category) => (
                          <option value={category.id}>{category.name}</option>
                      ))
                  }
              </select>
            </div>
            <div className="col-lg-6 mt-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={textForSearch}
                  aria-label={textForSearch}
                  aria-describedby="button-addon2"
                  value={keyword}
                  onChange={onChangeKeyword}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={searchData}
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            {
              allQuestion.length > 0 ? allQuestion.map((question) => (
                  <QnASection 
                    fullName={question.fullName} 
                    image={question.image}
                    title={question.title} 
                    content={question.content.length > 70 ? question.content.substring(0,70)+"..." : question.content} 
                    createdAt={question.createdAt} 
                    bgColor={{backgroundColor: '#F4F4F4'}} 
                  >
                    <h5 className="view-replies pb-2 link" onClick={() => navigate('/qnas/'+question.id)}>
                      View {question.answers} replies
                    </h5>
                  </QnASection>
              )) : ''
            }
            <p>
              Total QnA: {rows} Page: {rows ? page + 1 : 0} of {pages}
            </p>
          </div>
          {
              notification && ( 
                <ToastContainer position="top-end" className="position-fixed p-3">
                  <Toast bg={success ? 'primary' : 'danger'} onClose={() => setNotification(false)} show={notification} delay={3000} autohide>
                    <ToastHeader><strong className="me-auto">{success ? 'Success' : 'Failed'}</strong></ToastHeader>
                    <ToastBody>{message}</ToastBody>
                  </Toast>
                </ToastContainer>
              )
          }
          {/* Start Modal Create Question */}
          <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
              <ModalTitle><h5>Create Quextion</h5></ModalTitle>
            </ModalHeader>
              <form onSubmit={handleSubmit}>
            <ModalBody>
                <div className="mb-3">
                  <select onChange={onChangeCategoryId} className="form-select" required>
                      <option value="" selected disabled>Select Category</option>
                      {
                          dataCategories && dataCategories.map((category) => (
                              <option value={category.id}>{category.name}</option>
                          ))
                      }
                  </select>
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" id="title-question" placeholder="type your problem"  value={title} onChange={onChangeTitle} required/>
                </div>
                <div className="mb-3">
                  <textarea className="form-control" id="message-text" placeholder="Describe your problem"  value={content} onChange={onChangeContent} required></textarea>
                </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              <button className="btn btn-create-article">Create Question</button>
            </ModalFooter>
              </form>
          </Modal>
          {/* End Modal Create Question */}
          <nav 
            className="pagination justify-content-center"
            key={rows}
            role="navigation"
            aria-label="pagination"
          >
            <ReactPaginate
              previousLabel={"< Prev"}
              nextLabel={"Next >"}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName={"pagination"}
              pageLinkClassName={"page-link"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
              activeLinkClassName={"active"}
              disabledLinkClassName={"disabled"}
            />
          </nav>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default QnAs;
