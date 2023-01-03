import { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import loginImage from '../assets/logInImage.png';
import AuthLayout from '../components/AuthLayout';

const LogIn = () => {
    const [eye,setEye] = useState(true);
    const [password,setPassword] = useState("password");
    
    const Eye = () => {
        if (password==="password") {
            setPassword("text");
            setEye(false);
        } else {
            setPassword("password");
            setEye(true);
        }
    };
    return (
        <AuthLayout image={loginImage} textAuth={`Don't have an account? `} linkAuth={'/signup'} linkText={'Sign Up'}>
            <div className='row form-auth'>
                <h2 className='landing-text'>Read, ask, research.</h2>
                <form className='mt-4'>
                    <input type="email" placeholder="Enter Email" name="email" required />
                    <div className='input-group'>
                        <input type={password} placeholder="Password" name="password" className='form-control' required />
                        <span className='input-group-text'>
                        {
                            eye ? <FaEye onClick={Eye}/> : <FaEyeSlash onClick={Eye}/>
                        }
                        </span>
                    </div>
                    <div className='mt-0 row justify-content-start remember-group'>
                        <input className="col-1 ms-2" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="col-lg-4 col-8 mt-1" for="flexCheckDefault" style={{textAlign:'left'}}>
                            Remember Me
                        </label>
                    </div>
                    <button className='btn-auth mt-4 auth-action' style={{fontWeight:'700'}}>Sign In</button>
                    <p className='mb-4' style={{textAlign:'center'}}><FaLock/> Forgot Password?</p>
                    <p className='text-or mt-2 mb-2'><span>Or</span></p>
                    <button className='btn-auth-google mt-4'>
                        <img width="20px" style={{marginBottom:"3px", marginRight:'5px'}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                        Sign In With Google
                    </button>
                        
                </form>
            </div>
        </AuthLayout>
    )
}

export default LogIn;