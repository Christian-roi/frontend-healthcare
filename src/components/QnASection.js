import moment from "moment/moment";
import { FaCircle } from "react-icons/fa";
import blankProfile from "../assets/blank-profile.png";
import './QnASection.css';

const QnASection = ({fullName, createdAt, title, content, children, bgColor }) => {
    const dateTimeAgo = (createdAt) => {
        return moment(new Date(createdAt)).fromNow();
    };
    return (
        <div className="qna-container">
            <div className="row justify-content-end mt-3 mb-4 qna-section" style={bgColor}>
                <div className="col mt-2">
                    <img src={blankProfile} className="rounded-circle float-start" width="50" height="50" alt="avatar the writer"/>
                    <div className="row">
                        <div className="col align-self-start">
                            <h5 className="h-title">{title}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col align-self-start post-detail-description">
                            <p className="h-name">{fullName} <FaCircle className="ms-1 me-1"/> {dateTimeAgo(createdAt)}</p> 
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col align-self-start">
                            <h5 className="mt-1 h-content">{content}</h5>
                            <hr/>
                        </div>
                    </div>
                    <div className="row mt-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default QnASection;