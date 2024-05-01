import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log('Login successful:', user);
      navigate("/home", { state: { userEmail: email } });
    } catch (error) {
      console.error('Login error:', error.message);
      setLoginStatus(error.message);
    }
  };

  return (
    <div className='Auth-header Auth-column'>
      <Link to="/" className='Auth-goback'>&larr; &nbsp;Go back</Link>
      <form className='Auth-container Auth-column' style={{ alignItems: 'flex-start' }}>
        <h2>Sign In</h2>
        <p>Enter your details</p>
        <TextField name='email' label="Email"
          variant="outlined" fullWidth margin='normal' size='small'
          type='email' onChange={(e) => setEmail(e.target.value)}
        />
        <TextField id="Auth-input2" name="password" label="Password"
          variant="outlined" fullWidth margin='normal' size='small'
          type='password' onChange={(e) => setPassword(e.target.value)} />

        <p style={{ color: 'red' }}>{loginStatus}</p>

        <Button variant='contained'
          style={{ textTransform: 'none', marginBlock: '15px' }}
          fullWidth onClick={handleLogin}>Proceed</Button>
        <p>Are you a new user? &nbsp;
          <Link to="/register" style={{ width: '100%', margin: '0', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>

        <Link to="/adminlogin" style={{ width: '100%', margin: '0', textDecoration: 'none' }}>
          Admin Login
        </Link>
      </form>
    </div>
  );
}

export default Login;
