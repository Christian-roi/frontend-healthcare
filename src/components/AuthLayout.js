import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = ({image, children, textAuth, linkAuth, linkText}) => {
    const navigate = useNavigate();
    const backHome = () => {
      navigate('/')
    };
    return (
            <div className='row row-auth'>
                <div className='col-lg-6 d-none d-lg-block mt-4 intro-section'>
                    <img src={image} alt="logo" className="mx-auto"/>
                </div>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 form-section'>
                  <div className='container'>
                    <div className='row justify-content-between mt-4'>
                        <div className='col-2'>
                            <FaArrowLeft onClick={backHome} style={{cursor:'pointer'}} title='Back to Homepage'/>
                        </div>
                        <div className='col-lg-6 col-10'>
                            {textAuth} <Link to={linkAuth} className='link-text'>{linkText}</Link>
                        </div>
                    </div>
                    {children}
                  </div>
                </div>
            </div>
    )
}

export default AuthLayout;