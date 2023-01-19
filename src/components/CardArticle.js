import { Link } from "react-router-dom";
import { FaRegBookmark, FaShare } from "react-icons/fa";

const CardArticle = ({ postId, title, image, content }) => {

    // get the current url
    const url = "http://localhost:3000/detail-article/" + postId;

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
              {/* <Link to={'/detail-article/'+postId} className="read-more">
                            Read More
                        </Link> */}
              <div className="mt-3" style={{ color: "#292929" }}>
                <div className="row justify-content-between">
                  <div className="col-4">
                    <FaRegBookmark /> Save
                  </div>
                  <div className="col-2" style={{ textAlign: "right" }}>
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
