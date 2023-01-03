import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import signUpImage from '../assets/signUpImage.png';
import AuthLayout from "../components/AuthLayout";

const SignUp = () => {
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
        <AuthLayout image={signUpImage} textAuth={'Already have an account? '} linkAuth={'/login'} linkText={'Sign In'}>      
            <div className='row form-auth'>
                <h2 className='landing-text'>Your exploration begins here.</h2>
                <form className='mt-4'>
                    <div className='row row-name g-2'>
                        <input type='text' className='col me-1' placeholder='First Name' name='first_name' required/>
                        <input type='text' className='col ms-1' placeholder='Last Name' name='last_name' required/>
                    </div>
                    <input type="email" placeholder="Enter Email" name="email" required />
                    <div className='input-group'>
                        <input type={password} placeholder="Password" name="password" className='form-control' required />
                        <span className='input-group-text'>
                        {
                            eye ? <FaEye onClick={Eye}/> : <FaEyeSlash onClick={Eye}/>
                        }
                        </span>
                    </div>
                    <button className='btn-auth mt-4 auth-action' style={{fontWeight:'700'}}>Sign Up</button>
                    <p className='text-or mt-2 mb-2'><span>Or</span></p>
                    <button className='btn-auth-google mt-4'>
                        <img width="20px" style={{marginBottom:"3px", marginRight:'5px'}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                        Sign Up With Google
                    </button>
                        
                </form>
            </div>
        </AuthLayout>
    )
} 

export default SignUp;