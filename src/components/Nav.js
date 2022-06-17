import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { ReactComponent as User } from '../assets/user-circle.svg';
const Nav = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [userName, setUserName] = useState(null);

  const getUser = async () => {
    try{
      const response = await axios.get('https://alphanode-api.herokuapp.com/user', {
        params: {
          userId: cookies.UserId
        }
      })
      setUserName(response.data.name);
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  const navigate = useNavigate();

  const handleClick = () => {
    if(userName){
      removeCookie('UserId', cookies.UserId);
      removeCookie('AuthToken', cookies.AuthToken)
      window.location.reload();
    }
    navigate('/login');
  }

  return (
    <nav className='nav-bar'>
        <div className='logo-container'>
            <h2>Logo</h2>
        </div>

        <div className='nav-right'>
          <div className='user-icon'>
            <User />
          </div>
          <p>{userName}</p>
          <button 
              className='nav-button'
              onClick={handleClick}>
              {userName? 'Logout' : 'Login'}
          </button>
        </div>

    </nav>
  )
}

export default Nav