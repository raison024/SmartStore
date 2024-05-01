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

function History() {
    // const [totalAmount,setTotalAmount]=useState(0);
    const navigate = useNavigate();
    let { state } = useLocation();

    //Modal Open/Close
    const [open, setOpen] = React.useState(false);

    function handleOpen(pay_id) {
        setSelectedPayId(pay_id);
        setOpen(true);
    }

    const handleClose = () => setOpen(false);
    const [selectedPayId, setSelectedPayId] = useState(null);

    function goback() {
        navigate("/home", { state: { userEmail: (state.userEmail) } });
    }

    const [payList, setPayList] = useState([]);
    const [prodList, setProdList] = useState([]);
    const [totalprice, setTotalPrice] = useState("Hey");

    function handlebill() {
        Axios.post("http://localhost:3002/api/getcartitems", { vid: 300, cid: state.userId }).then((data) => {
            setProdList(data.data)
        });


        Axios.post("http://localhost:3002/api/gettotalcartprice", { vid: 300, cid: state.userId }).then((data, vid) => {
            setTotalPrice(parseInt(data))
            console.log("Virtual Cart id:" + vid)
            console.log("Test value:" + (data.data))
            console.log("this is the total:" + totalprice)
            setTotalPrice(data.data[0]["SUM(price)"]);
        });
    }
    const [payProd, setPayProd] = useState([])
    useEffect(() => {
        if (selectedPayId) {
            Axios.get(`http://localhost:3002/api/get_pay_products/${selectedPayId}`)
                .then((res) => {
                    console.log(res);
                    setPayProd(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [selectedPayId]);

    useEffect(() => {
        Axios.post("http://localhost:3002/api/getuserhistory", { cid: state.userId }).then((data) => {
            setPayList(data.data)
        });
    }, []);

    return (
        <div className='Auth-header User-column'>
            <a className='Auth-goback' onClick={goback}>&larr; &nbsp;Go back</a>
            <div style={{ width: '30%', padding: '20px', background: '#d0d0d0' }}>
                <h4>Payment History</h4>
                {/* <p>{state.userId}</p> */}

                {payList.map(payment => (
                //                       const dob = new Date(payment.pay_time);
                // const formattedDate = dob.toLocaleDateString();
                // const time = new Date(payment.pay_time)
                // const formattedTime = time.toLocaleTimeString();
                <a key={payment.pay_id} className='User-paylist' onClick={() => handleOpen(payment.pay_id)}>
                    <p>{payment.pay_time}</p>
                    <p>Rs. {payment.total_pay}</p>
                </a>
                ))}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className='User-column' style={{ alignItems: 'flex-start' }}>
                            <h4>Your bill</h4>
                            <br />

                            {payProd.map((prod) => {
                                return (
                                    <li key={prod.pid}> {prod.pname}
                                        {/* <p>{prod.pid}</p> */}
                                        {/* <p>{prod.quantity}</p> */}
                                        <p>Rs. {prod.price}</p>

                                    </li>
                                )
                            })}
                            <p><br />Total Items taken:{payProd.length}</p>
                            <input type="text" placeholder="Name" name='total' style={{ display: 'none' }}></input>
                        </div>
                    </Box>
                </Modal>


            </div>
        </div>
    )
}

export default History