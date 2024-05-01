import React, { useState } from 'react';
import { TextField, Button, Avatar } from '@mui/material'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase';

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobileno, setMobileNo] = useState("");
  const [dob, setDOB] = useState("2001-06-20");
  const [selectedImage, setSelectedImage] = useState(null);
  // const [gender,setGender] = useState("");

  const navigate = useNavigate();

  // const submitPost = (e) => {
  //   e.preventDefault();

  //   const data = { userName: userName ,email: email, password: password, gender: gender, dob: dob, mobile: mobile };

  //   Axios.post('http://localhost:3002/api/createuser', data)
  //       .then((response) => {
  //       if (response.data.success) {
  //           navigate("/login");
  //           alert(`${email} Registered Successfully :)`)

  //       }})
  //       .catch((error) => {
  //       console.log(error);
  //       });

  // }

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const file = selectedImage;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            phno: mobileno,
            dob: dob,
            user_pfp: 'https://hmxguflicvneitwlnqnc.supabase.co/storage/v1/object/public/ShopSmart/user_pfp/'+username
          }
        }
      });

      if (error) {
        throw error;
      }


      const { img, imgerror } = await supabase.storage.from('ShopSmart/user_pfp').upload(username, file)
      if (imgerror) {
        throw imgerror;
      }


      console.log('Sign up successful:', username);
      navigate("/login");
      // You can redirect the user or show a success message here
    } catch (error) {
      console.error('Sign up error:', error.message);
    }
  };

  return (
    <div className='Auth-header Auth-column'>

      <Link to="/" className='Auth-goback'>&larr; &nbsp;Go back</Link>

      <form method="POST" className='Auth-container Auth-column' style={{ alignItems: 'flex-start' }}
      onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        handleSignUp(e); // Pass the event object to handleSignUp function
      }}
      >

        <h2>Sign Up</h2>
        <p>Enter your details</p>

        <TextField id="Auth-input0" label="Customer Name" required
          variant="outlined" fullWidth margin='normal' size='small'
          type='text' onChange={(e) => { setUsername(e.target.value) }} />

        <input
          type="file"
          name="myImage"
          style={{ width: '100%' }}
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />



        {selectedImage && (
          <div>
            {/* <img
              alt="not found"
              width={"50px"}
              style={{ borderRadius: '50px' }}
              src={URL.createObjectURL(selectedImage)}
            /> */}
            <Avatar alt="user_avatar" src={URL.createObjectURL(selectedImage)} margin='normal' style={{ marginBlock: '10px' }} />
            <Button variant='outlined' style={{ textTransform: 'none' }} margin='normal' onClick={() => setSelectedImage(null)}>Remove</Button>
          </div>
        )}


        <TextField id="date" required className='dob' label="Birthday" type="date" margin='normal' defaultValue="2001-06-20" InputLabelProps={{ shrink: true, }} onChange={(e) => { setDOB(e.target.value) }} />

        <TextField id="Auth-input" label="Email" required
          variant="outlined" fullWidth margin='normal' size='small'
          type='email' onChange={(e) => { setEmail(e.target.value) }} />

        <TextField id="Auth-input2" label="Password" required
          variant="outlined" fullWidth margin='normal' size='small'
          type='password' onChange={(e) => { setPassword(e.target.value) }} />

        <TextField id="Auth-input3" label="Mobile Number" required
          variant="outlined" fullWidth margin='normal' size='small'
          type="tel" onChange={(e) => { setMobileNo(e.target.value) }} />

        <Button variant='contained' margin='normal'
          style={{ textTransform: 'none' }}
          fullWidth type='submit'>Proceed</Button>

        <p>Already a user?&nbsp;
          <Link to="/login" style={{ width: '100%', margin: '0', textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>



      </form>
    </div>
  )
}

export default Register