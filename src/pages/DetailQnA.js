import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import QnABanner from "../components/QnABanner";
import QnASection from "../components/QnASection";
import questionService from "../services/question";

const DetailQnA = () => {
    const params = useParams();
    const data = {};
    const [currentQnA, setCurrentQnA] = useState(data);

    const getQnA = async (id) => {
        questionService.get(id).then((res) => {
            setCurrentQnA(res.data);
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: err
            });
        })
    };

    useEffect(() => {
        getQnA(params.id);
    }, [params.id]);    
    return (
        <div>
            <Navbar/>
            <QnABanner className="banner-grey" image="/qnadetail.png"/>
            <div className="container-fluid container-article">
                <div className="row mt-3 justify-content-start">
                    <div className="col-lg-4 mt-4">
                        <h2 className="p-0">Ask the Doctor!</h2>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb navigate-menu text-start">
                                <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                <li className="breadcrumb-item"><Link to={'/qnas'}>QnA</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Answers</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <h4>Question</h4>
                        </div>
                    </div>
                    <div className="row">
                        { currentQnA.data ? (
                            <QnASection
                                fullName={currentQnA.data.user.first_name+" "+currentQnA.data.user.last_name}
                                image={currentQnA.data.user.image}
                                title={currentQnA.data.title}
                                content={currentQnA.data.content}
                                createdAt={currentQnA.data.createdAt}
                                bgColor={{backgroundColor: '#F4F4F4'}} 
                            >
                                <h5 className="view-replies pb-2">Reply</h5>
                            </QnASection>
                        ) : ("") }
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h4>Answers:</h4>
                        </div>
                    </div>
                    <div>
                        { currentQnA.data ? (
                            currentQnA.data.answers.length > 0 ? currentQnA.data.answers?.map((answer) => (
                            <div>
                                <QnASection
                                    fullName={answer.user.role.role_name}
                                    image={answer.user.image}
                                    title={answer.user.first_name+" "+answer.user.last_name}
                                    content={answer.content}
                                    createdAt={answer.createdAt}
                                    bgColor={{backgroundColor: answer.user.role.role_name === "Doctor" ? '#E5F4E2' : '#F4F4F4'}} 
                                >
                                </QnASection>
                            </div>
                            ))
                            : <h6 className="mt-2">No Answer Yet</h6>
                        ) : (
                            ""
                        ) }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default DetailQnA;