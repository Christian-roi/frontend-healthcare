import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import './Article.css'
import ArticleMain from "../components/ArticleMain";

const Articles = () => {
    return (
        <div>
            <Navbar />
            <div className="container-fluid container-article">
                <div className="row">
                    <div className="col-4 mt-4">
                        <h2>Article Choice</h2>
                        {/* <Link to={'/'} style={{textAlign: 'left'}}>Home</Link> */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb navigate-menu">
                                <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Article Choice</li>
                            </ol>
                        </nav>
                    </div>
                    <ArticleMain />
                </div>
            </div>
        </div>
    )
};

export default Articles;