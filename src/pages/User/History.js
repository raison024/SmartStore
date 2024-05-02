import React, { useState, useEffect } from 'react'
import './User.css'
import Avatar from '../../assets/avatar.png'
import { Button, Fab, IconButton, Box, Typography, Modal, Snackbar, TextField } from '@mui/material'
import '../Auth/Auth.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../supabase'; // Import your Supabase client

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
    const navigate = useNavigate();
    let { state } = useLocation();

    //Modal Open/Close
    const [open, setOpen] = React.useState(false);

    function handleOpen(cartId) {
        setSelectedCartId(cartId);
        setOpen(true);
    }

    const handleClose = () => setOpen(false);
    const [selectedCartId, setSelectedCartId] = useState(null);

    function goback() {
        navigate("/home", { state: { userEmail: (state.userEmail) } });
    }

    const [payList, setPayList] = useState([]);
    const [prodList, setProdList] = useState([]);
    const [totalprice, setTotalPrice] = useState("Hey");

    useEffect(() => {
        // Fetch user history and payment products when the component mounts
        const fetchData = async () => {
            try {
                // Fetch user payment history
                const payListData = await supabase
                    .from('payments')
                    .select('*')
                    .eq('user_email', state.userEmail);

                setPayList(payListData.data);

                // Fetch payment products if a payment ID is selected
                if (selectedCartId) {
                    const payProdData = await supabase
                        .from('cart')
                        .select('*')
                        .eq('cart_id', selectedCartId);

                    setPayProd(payProdData.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [selectedCartId, state.userId]);

    const [payProd, setPayProd] = useState([]);

    return (
        <div className='Auth-header User-column'>
            <a className='Auth-goback' onClick={goback}>&larr; &nbsp;Go back</a>
            <div style={{ width: '90%', padding: '20px', background: '#d0d0d0' }}>
                <h4>Payment History</h4>

                {payList.map(payment => (
                    <a key={payment.pay_id} className='User-paylist' onClick={() => handleOpen(payment.cart_id)}>
                        <p>{payment.payment_date}</p>
                        <p>Rs. {payment.payment_amount}</p>
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
                                    <li key={prod.pid}> {prod.prod_id}
                                        <p>Rs. {prod.prod_price}</p>
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

export default History;
