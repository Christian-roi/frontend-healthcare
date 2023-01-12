import { FaRegBookmark } from "react-icons/fa";

const QnASection = ({image, first_name, last_name, }) => {
    return (
        <div>
            <div className="row justify-content-end mt-4 mb-4">
                <div className="col-lg-10 col-10" style={{textAlign:'left'}}>
                    <img src={blankProfile} className="rounded-circle float-start" width="50" height="50" alt="avatar the writer"/>
                    <div className="row">
                        <div className="col-lg-3 align-self-start">
                            <h5>{currentPost.data.user.first_name+" "+currentPost.data.user.last_name}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 align-self-start post-detail-description">
                            <p>{currentPost.data.category.name} <FaCircle/> {changeFormatDate(currentPost.data.createdAt)}</p> 
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <FaRegBookmark className="ms-1 me-1"/>
                    Save
                </div>
            </div>
        </div>
    )
};

export default QnASection;