import { Link } from "react-router-dom";
import { FaRegBookmark, FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import { actionArchive } from "../redux/actions/acrhive";


const CardArticle = ({ postId, title, image, content }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const userId =  useMemo(() => currentUser?.id ?? 0, [currentUser?.id]);
  const dispatch = useDispatch();
  
  const [showUnauthorized, setShowUnauthorized] = useState(false);
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const messageUnauthorization = () => {
    Swal.fire({
      icon: 'error',
      title: 'Unauthorization',
      text: 'You must logged In to use this feature',
      footer: '<a href="/login">Click here to login</a>'
    })
  }

  const dataArchive = {
    userId,
    postId
  }

  const handleSaveArticle = () => {
    dispatch(actionArchive(dataArchive)).then((data) => {
      setMessage(data.message);
      setSuccess(true);
    }).catch((err) => {
      setMessage(err.data.message);
      setSuccess(false);
    }).finally(() => {
      setNotification(true);
    })
  };

  const actionSaveArticleButton = () => {
    userId === 0 ? setShowUnauthorized(true) : handleSaveArticle()
  };

  // get the current url
  let url = "https://healthhub.vercel.app/detail-article/" + postId;

  const Share = () => {
      if (navigator.share) {
          navigator.share({
              title: 'Web Share API Demo',
              text: 'Check out Web Share API!',
              url: url,
          })
              .then(() => console.log('Successful share'))
              .catch((error) => console.log('Error sharing', error));
      } else {
          alert('Web Share API is not supported.');
      }
  }


  return (
    <div className="card mb-4">
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
      <div className="row g-0">
        <div className="col-md-4 mt-3">
          <img
            src={image}
            className="img-fluid rounded-start"
            alt="Article Thumb"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h4 className="card-title">
              <Link to={"/detail-article/" + postId}>{title}</Link>
            </h4>
            <p className="card-text">
              <div
                className="post-thumb"
                dangerouslySetInnerHTML={{
                  __html: content.substring(0, 70) + "<p>....</p>",
                }}
              />
              <div className="mt-3" style={{ color: "#292929" }}>
                <div className="row justify-content-between">
                  <div className="col-3 link" onClick={actionSaveArticleButton}>
                    <FaRegBookmark /> Save
                  </div>
                  <div className="col-2 link" style={{ textAlign: "right" }}>
                    <FaShare onClick={Share} />
                  </div>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardArticle;
