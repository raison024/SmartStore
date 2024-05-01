import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { Button, Avatar } from '@mui/material'
import Logo from '../../assets/logo.png'
import { supabase } from '../../supabase';

function UserNavbar() {
  let { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userid, setUserId] = useState();
  const [user_pfp, setUserpfp] = useState();

  function accountclick() {
    navigate("/account", { state: { userEmail: (state.userEmail), userId: userid } });
  }

  function histclick() {
    navigate("/history", { state: { userEmail: (state.userEmail), userId: userid } });
  }

  function feedclick() {
    navigate("/feedback", { state: { userEmail: (state.userEmail), userId: userid } });
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  const fetchUserData = async () => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, username, pfp')
        .eq('email', state.userEmail) // Assuming `email` is the variable containing the user's email
        .single();
  
      if (userError) {
        throw userError;
      }
  
      if (!userData) {
        console.log('User not found');
        return;
      }
  
      setName(userData.username);
      setUserId(userData.id);
      setUserpfp(userData.pfp);
      console.log('Welcome ID:'+userid+" is: "+name);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  return (
    <div className='Navbar' style={{ color: 'black' }}>

      {/* First Part */}
      <div className='Navbar-row'>
        <div className='Navbar-logo' style={{ color: 'black' }}>
          Shop<span style={{ color: '#1565c0' }}>Smart</span>
        </div>
        <div className='Navbar-linkscontainer'>
          {/* <a style={{ color: 'black' }} onClick={accountclick}>Account</a> */}
          {/* <a style={{ color: 'black' }} onClick={histclick}>History</a>
          <a style={{ color: 'black' }} onClick={feedclick}>Feedback</a> */}
        </div>
      </div>

      {/* Second Part */}
      <div className='Navbar-row'>

        {/* <h6 style={{ margin: 0 }}>Welcome, {name}</h6> */}
        <Avatar src={user_pfp} style={{margin: '10px'}} />
        <Link to="/">
          Log
        </Link>
      </div>

    </div>
  )
}

export default UserNavbar