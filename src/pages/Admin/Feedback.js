import React, { useState, useEffect } from 'react'
import './Stores.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import SideBar from '../../components/Admin SideBar/SideBar'
import Axios from 'axios'


function Feedbacks() {

    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3003/api/read_feedbacks')
            .then(res => {
                console.log(res)
                setFeedbacks(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className='Admin'>
            <SideBar />
            <div className='AdminStores-container'>
                <div className='feedback-container'>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <h3>Feedbacks</h3>
                    </div>
                    <table className="table table-hover mt-3 table-bordered ">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">Feedback ID</th>
                                <th scope="col">How would you rate your overall experience with our service?</th>
                                <th scope="col">How satisfied are you with the comprehensiveness of our offer?</th>
                                <th scope="col">Whether our application is user-friendly</th>
                                <th scope="col">How satisfied are you with the customer support?</th>
                                <th scope="col">Would you recommend our service to other people?</th>
                                <th scope="col">What should we change in order to live up to your expectations? </th>
                                {/* <th scope="col">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback) => {

                                return (
                                    <tr key={feedback.fid}>
                                        <td>{feedback.fid}</td>
                                        <td>{feedback.overall}</td>
                                        <td>{feedback.offer}</td>
                                        <td>{feedback.user_friendly}</td>
                                        <td>{feedback.support}</td>
                                        <td>{feedback.recommend}</td>
                                        <td>{feedback.expectation}</td>
                                        {/* <td className='d-flex justify-content-between'> */}
                                        {/* <button className='btn btn-success'>read</button> */}
                                        {/* <button className='btn'><PageviewOutlinedIcon/></button> */}
                                        {/* <button className='btn' onClick={() => handleDelete(customer.cid)}><DeleteIcon/></button> */}
                                        {/* </td> */}
                                    </tr>
                                );
                            })}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Feedbacks;
