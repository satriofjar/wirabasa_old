import axios from 'axios';
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('https://alphanode-api.herokuapp.com/login', { email, password })
            setCookie('AuthToken', response.data.token);
            setCookie('UserId', response.data.userId);

            const success = response.status === 200;

            if(success) navigate('/');


        } catch(err){
            setError('Email/password yang anda masukan salah')
            console.log(err);
        }
    }

  return (
    <div className='login'>
        <div className='login-form'>
            <h2>Sign In</h2>
            <p>By clicking Log In, you agree to out terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            
            <form onSubmit={handleSubmit} >
            <input 
                type='email'
                id='emial'
                name='emial'
                placeholder='email'
                required={true}
                onChange={(e) => setEmail(e.target.value)}

            />
            
            <input 
                type='password'
                id='password'
                name='password'
                placeholder='password'
                required={true}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <p>{error}</p>
            <input className='secondary-button' type='submit' />

            </form>
            <hr />
            <p>Don't have an account? <Link to={'/register'} >CREATE ACCOUNT</Link> </p> 
                   
        </div>
    </div>
  )
}

export default Login