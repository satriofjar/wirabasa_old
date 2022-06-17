import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        if(password !== confirmPassword){
          setError('Password need to match!');
          return;
        }
        const response = await axios.post('https://alphanode-api.herokuapp.com/signup', { name, email, phoneNumber, password });

        const success = response.status === 200;

        if(success) navigate('/login');
        window.location.reload();

      } catch(err){
        console.log(err);
      }
    }

  return (
    <div className='login'>
        <div className='login-form'>
        <h2>CREATE ACCOUNT</h2>
        <p>By clicking Log In, you agree to out terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
        
        <form onSubmit={handleSubmit} >
          <input 
            type='text'
            id='name'
            name='name'
            placeholder='name'
            required={true}
            onChange={(e) => setName(e.target.value)} />
            
          <input 
            type='email'
            id='emial'
            name='emial'
            placeholder='email'
            required={true}
            onChange={(e) => setEmail(e.target.value)} />

          <input 
            type='text'
            id='phone-number'
            name='phone-number'
            placeholder='phone number'
            required={true}
            onChange={(e) => setPhoneNumber(e.target.value)} />
          
          <input 
            type='password'
            id='password'
            name='password'
            placeholder='password'
            required={true}
            onChange={(e) => setPassword(e.target.value)} />
          
        <input 
            type='password'
            id='password-check'
            name='password-check'
            placeholder='confirm Password'
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)} />

          <input className='secondary-button' type='submit' />

          <p>{error}</p>

        </form>
        <hr />
        <p>Already have an account? <Link to={'/login'}>Login</Link></p>

        </div>
    </div>
  )
}

export default Register