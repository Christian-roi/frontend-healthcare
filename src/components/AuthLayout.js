import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = ({image, children, textAuth, linkAuth, linkText}) => {
    const navigate = useNavigate();
    const backHome = () => {
      navigate('/')
    };
    return (
        <div className='container-fluid'>
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
        </div>
    )
}

export default AuthLayout;

/*
import './AuthLayout.css';
import signUpImage from '../assets/signUpImage.png';
const AuthLayout = () => {
  return (
    <div className="sign-up-page-deskt">
      <img className="rectangle-12" src={signUpImage} />
      <div className="flex-container">
        <div className="background">
          <img className="arrow-left" src={arrowLeft} />
          <img className="vector-38" src={vector38} /> 
          <input className="full-name" type="text" />
          <input className="full-name-1" type="text" />
          <input className="full-name-2" type="text" />
          <img className="sign-up-button-pri" src={signUpButtonPri} /> 
          <div className="flex-container-1">
            <hr className="line-1" />
            <span>or</span>
            <hr className="line-2" />
          </div>
          <img className="sign-up-button-goo" src={signUpButtonGoo} /> 
        </div>
        <img className="vector-39" src={vector39} />
        <img className="vector-40" src={vector40} /> 
      </div>
    </div>
  );
};
export default AuthLayout;
*/