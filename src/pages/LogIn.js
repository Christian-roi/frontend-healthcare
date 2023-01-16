import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import loginImage from '../assets/logInImage.png';
import AuthLayout from '../components/AuthLayout';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/auth';
import Swal from 'sweetalert2';

const LogIn = () => {

    const navigate = useNavigate();

    const [eye,setEye] = useState(true);
    const [typePassword, setTypePassword] = useState("password");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        if(email === "" || password === "" || email === null || password === null) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all the fields!",
            });
            setLoading(false);
            return;
        }
        dispatch(login(email,password))
            .then(() => {
                navigate('/');
                window.location.reload();
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: message,
                });
                setLoading(false);
            });
    };

    if (isLoggedIn) {
      return <Navigate to="/" />;
    }

    const checkLogin = (e) => {
        e.preventDefault();
        if(email === "" || password === "" || email === null || password === null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!',
            });
        } else {
            handleLogin();
        }
    };

    const Eye = () => {
        if (typePassword === "password") {
            setTypePassword("text");
            setEye(false);
        } else {
            setTypePassword("password");
            setEye(true);
        }
    };
    return (
        <AuthLayout image={loginImage} textAuth={`Don't have an account? `} linkAuth={'/signup'} linkText={'Sign Up'}>
            <div className='row form-auth'>
                <h2 className='landing-text'>Read, ask, research.</h2>
                <form className='mt-4' onSubmit={checkLogin}>
                    <input type="email" placeholder="Enter Email" name="email" required className='form-control' onChange={onChangeEmail} value={email} />
                    <div className='input-group'>
                        <input type={typePassword} placeholder="Password" name="password" className='form-control' required onChange={onChangePassword} value={password} />
                        <span className="input-group-text" onClick={Eye} style={{cursor:'pointer'}}>
                            {eye ? <FaEye/> : <FaEyeSlash/>}
                        </span>
                    </div>
                    {/* <div className='mt-0 row justify-content-start remember-group'>
                        <input className="col-1 ms-2" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="col-lg-4 col-8 mt-1" for="flexCheckDefault" style={{textAlign:'left'}}>
                            Remember Me
                        </label>
                    </div> */}
                    <button className='btn-auth mt-4 auth-action' style={{fontWeight:'700'}} onClick={handleLogin} disabled={loading}>
                        { loading && ( <span className="spinner-border spinner-border-sm"></span> ) } 
                        { loading && <span> Loading...</span> }
                        { !loading && <span>Log In</span> }
                    </button>
                    {/* <p className='mb-4' style={{textAlign:'center'}}><FaLock/> Forgot Password?</p> */}
                    {/* <p className='text-or mt-2 mb-2'><span>Or</span></p> */}
                    {/* <button className='btn-auth-google mt-4'>
                        <img width="20px" style={{marginBottom:"3px", marginRight:'5px'}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                        Sign In With Google
                    </button>
                         */}
                </form>
            </div>
        </AuthLayout>
    )
}

export default LogIn;