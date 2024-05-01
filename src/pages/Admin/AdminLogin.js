
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setloginStatus] = useState("");

  const navigate = useNavigate();

  const adminLogin = () => {
    if (email == 'admin' && password == 'admin') {
      navigate("/adminhome");
    }
    else {
      setloginStatus("Invalid Credentials!")
    }
  }

  return (

    <div className='AdminLogin-header AdminLogin-column'>
      <Link to="/login" className='AdminLogin-goback'>&larr; &nbsp;Go back</Link>
      <form className='Auth-container Auth-column' style={{ alignItems: 'flex-start' }}>
        <h2>Administrator Login</h2>
        <p>Enter your details</p>
        <TextField name='email' label="Email"
          variant="outlined" fullWidth margin='normal' size='small'
          type='email' onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField id="AdminLogin-input2" name="password" label="Password"
          variant="outlined" fullWidth margin='normal' size='small'
          type='password' onChange={(e) => {
            setPassword(e.target.value);
          }} />
          <h6 style={{color: 'red'}}>{loginStatus}</h6>

        <Button variant='contained'
          style={{ textTransform: 'none', marginBlock: '15px' }}
          fullWidth onClick={adminLogin}>Proceed</Button>
        
      </form>
    </div>
  )
}

export default AdminLogin