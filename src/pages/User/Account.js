import React, {useState, useEffect} from 'react'
import './User.css'
import Avatar from '../../assets/avatar.png'
import { TextField, Button } from '@mui/material'
import '../Auth/Auth.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Axios from 'axios'

function Account() {
    const navigate = useNavigate();
    let { state } = useLocation();

    const [user, setUser] = useState({
        cid: '',
        cname: '',
        cemail: ''
      });

        useEffect(() => {
            Axios.get('http://localhost:3002/api/getuserinfo', { cid: state.userId })
                .then(response => {
                    const data = response.data;
                    if (data.error) {
                        console.error(data.error);
                    } else {
                        setUser(data);
                    }
                })
                .catch(error => console.error(error));
        });

        function handleInputChange(event) {
            const { cname, value } = event.target;
            setUser({ ...user, [cname]: value });
        }

        function handleSubmit(event) {
            event.preventDefault();
            // code to update user data in database goes here
        }


        function goback() {
            navigate("/home", { state: { userEmail: (state.userEmail) } });
        }


        return (
            <div className='Auth-header User-column'>
                <a className='Auth-goback' onClick={goback}>&larr; &nbsp;Go back</a>
                <div style={{ width: '30%', padding: '20px', background: '#d0d0d0' }}>
                    <h4>Account Settings</h4>
                    <p>{state.userId}</p>
                    <div className='User-column' style={{ width: '100%' }}>
                        <img src={Avatar} height='200px'></img>
                    </div>
                    <TextField name='cname' label="Name"
                        variant="outlined" fullWidth margin='normal' size='small' value={user.cname}
                        type='email'

                    />

                    <TextField name='cemail' label="Email"
                        variant="outlined" fullWidth margin='normal' size='small' value={user.cemail}
                        type='email'

                    />
                    <TextField name="password" label="Password"
                        variant="outlined" fullWidth margin='normal' size='small'
                        type='password'
                    />

                    <Button variant='contained'
                        style={{ textTransform: 'none', marginBlock: '15px', height: '40px' }}
                        fullWidth>Update Account</Button>

                    <Button variant='contained'
                        style={{ textTransform: 'none', marginBlock: '5px', height: '40px', background: '#fb4c38' }}
                        fullWidth>Delete Account</Button>
                </div>
            </div>
        )
    }

    export default Account