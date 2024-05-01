import React, { useState, useEffect } from 'react'
import './User.css'
import Avatar from '../../assets/avatar.png'
import { Button, Fab, IconButton, Box, Typography, Modal, Snackbar, TextField } from '@mui/material'
import '../Auth/Auth.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Axios from 'axios'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

function Feedback() {
    const navigate = useNavigate();
    let { state } = useLocation();

    function goback() {
        navigate("/home", { state: { userEmail: (state.userEmail) } });
    }

    const [overall, setOverall] = useState("")
    const [offer, setOffer] = useState("")
    const [userFriendly, setUserFriendly] = useState("")
    const [support, setSupport] = useState("")
    const [recommend, setRecommend] = useState("")
    const [expectation, setExpectation] = useState("")
    
    const submitPost = (e) => {
        e.preventDefault();

        const data = { overall: overall, offer: offer, userFriendly: userFriendly, support: support, recommend: recommend, expectation: expectation }
        const url = 'http://localhost:3002/api/feedbacks'
        
        Axios.post(url, data)
        .then((response) => {
            if (response.data.success) {
                navigate("/home", { state: { userEmail: (state.userEmail) } });
            alert(`Thankyou for the feedback!`);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='feed-body'>
        <div className='testbox'>
            <a className='Auth-goback' onClick={goback}>&larr; &nbsp;Go back</a>
            <div style={{ height: '100%',width: '100%', padding: '20px', background: '#d0d0d0' }}>
                
                <form method='post' onSubmit={submitPost}>
                    <h1>Customer Feedback Form</h1>
                    <p>Please take a few minutes to give us feedback about our service by filling in this short Customer Feedback Form. We are conducting this research in order to measure your level of satisfaction with the quality of our service. We thank you for your participation.</p>
                    <hr />
                    <h3>Overall experience with our service</h3>
                    <table>
                        <tr>
                            <th class="first-col"></th>
                            <th>Very Good</th>
                            <th>Good</th>
                            <th>Fair</th>
                            <th>Poor</th>
                            <th>Very Poor</th>
                        </tr>
                        <tr>
                            <td class="first-col">How would you rate your overall experience with our service?</td>
                            <td><input type="radio" value="VGood" name="rate" checked={overall === "VGood"} onChange={(e) => setOverall(e.target.value)} /></td>
                            <td><input type="radio" value="Good" name="rate" checked={overall === "Good"} onChange={(e) => setOverall(e.target.value)} /></td>
                            <td><input type="radio" value="Fair" name="rate" checked={overall === "Fair"} onChange={(e) => setOverall(e.target.value)} /></td>
                            <td><input type="radio" value="Poor" name="rate" checked={overall === "Poor"} onChange={(e) => setOverall(e.target.value)} /></td>
                            <td><input type="radio" value="VPoor" name="rate" checked={overall === "VPoor"} onChange={(e) => setOverall(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td class="first-col">How satisfied are you with the comprehensiveness of our offer?</td>
                            <td><input type="radio" value="VGood" name="satisfied" checked={offer === "VGood"} onChange={(e) => setOffer(e.target.value)} /></td>
                            <td><input type="radio" value="Good" name="satisfied" checked={offer === "Good"} onChange={(e) => setOffer(e.target.value)} /></td>
                            <td><input type="radio" value="Fair" name="satisfied" checked={offer === "Fair"} onChange={(e) => setOffer(e.target.value)} /></td>
                            <td><input type="radio" value="Poor" name="satisfied" checked={offer === "Poor"} onChange={(e) => setOffer(e.target.value)} /></td>
                            <td><input type="radio" value="VPoor" name="satisfied" checked={offer === "VPoor"} onChange={(e) => setOffer(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td class="first-col">Whether our application is User-Friendly?</td>
                            <td><input type="radio" value="VGood" name="user-friendly" checked={userFriendly === "VGood"} onChange={(e) => setUserFriendly(e.target.value)} /></td>
                            <td><input type="radio" value="Good" name="user-friendly" checked={userFriendly === "Good"} onChange={(e) => setUserFriendly(e.target.value)} /></td>
                            <td><input type="radio" value="Fair" name="user-friendly" checked={userFriendly === "Fair"} onChange={(e) => setUserFriendly(e.target.value)} /></td>
                            <td><input type="radio" value="Poor" name="user-friendly" checked={userFriendly === "Poor"} onChange={(e) => setUserFriendly(e.target.value)} /></td>
                            <td><input type="radio" value="VPoor" name="user-friendly" checked={userFriendly === "VPoor"} onChange={(e) => setUserFriendly(e.target.value)} /></td>
                        </tr>

                        <tr>
                            <td class="first-col">How satisfied are you with the customer support?</td>
                            <td><input type="radio" value="VGood" name="support" checked={support === "VGood"} onChange={(e) => setSupport(e.target.value)} /></td>
                            <td><input type="radio" value="Good" name="support" checked={support === "Good"} onChange={(e) => setSupport(e.target.value)} /></td>
                            <td><input type="radio" value="Fair" name="support" checked={support === "Fair"} onChange={(e) => setSupport(e.target.value)} /></td>
                            <td><input type="radio" value="Poor" name="support" checked={support === "Poor"} onChange={(e) => setSupport(e.target.value)} /></td>
                            <td><input type="radio" value="VPoor" name="support" checked={support === "VPoor"} onChange={(e) => setSupport(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td class="first-col">Would you recommend our product / service to other people?</td>
                            <td><input type="radio" value="VGood" name="recommend" checked={recommend === "VGood"} onChange={(e) => setRecommend(e.target.value)} /></td>
                            <td><input type="radio" value="Good" name="recommend" checked={recommend === "Good"} onChange={(e) => setRecommend(e.target.value)} /></td>
                            <td><input type="radio" value="Fair" name="recommend" checked={recommend === "Fair"} onChange={(e) => setRecommend(e.target.value)} /></td>
                            <td><input type="radio" value="Poor" name="recommend" checked={recommend === "Poor"} onChange={(e) => setRecommend(e.target.value)} /></td>
                            <td><input type="radio" value="VPoor" name="recommend" checked={recommend === "VPoor"} onChange={(e) => setRecommend(e.target.value)} /></td>
                        </tr>
                    </table>
                    
                    <h4>What should we change in order to live up to your expectations?</h4>
                    <textarea rows="5" onChange={ (e) => setExpectation(e.target.value) }></textarea>
                    
                    <div class="btn-block">
                        <button className='feedbackbtn' type="submit">Leave Feedback</button>
                    </div>
                </form>
                   


            </div>
        </div>
        </div>
    )
}

export default Feedback