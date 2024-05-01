
import React, { useState, useEffect } from 'react'
import SideBar from '../../components/Admin SideBar/SideBar'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './Stores.css'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Axios from 'axios'


function Customers() {

  const [payments, setPayments] = useState([])
  const [open, setOpen] = React.useState(false);

  function handleOpen(pay_id) {
    setSelectedPayId(pay_id);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);
  const [selectedPayId, setSelectedPayId] = useState(null);
  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  //   width: 400,
  //   height: 400,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // };

  const tableModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    width: 950,
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  useEffect(() => {
    Axios.get('http://localhost:3003/api/read_payments')
      .then(res => {
        console.log(res)
        setPayments(res.data)
      })
      .catch(err => console.log(err))
    console.log("Testing: " + payments)
  }, []);

  useEffect(() => {
    if (selectedPayId) {
      Axios.get(`http://localhost:3003/api/get_pay_products/${selectedPayId}`)
        .then((res) => {
          console.log(res);
          setPayProd(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedPayId]);



  const [payProd, setPayProd] = useState([])

  return (
    <div className='Admin'>
      <SideBar />


      <div class="AdminStores-container">
        <>
          <div className='Customers-right mt-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h3 >Payments</h3>
            <table className="table table-hover mt-3 table-bordered ">
              <thead>
                <tr className='table-dark'>
                  <th scope="col">Payment ID</th>
                  <th scope="col">Customer ID</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Virtual Cart ID</th>
                  <th scope="col">Total Payment</th>
                  <th scope="col">Payment Date</th>
                  <th scope="col">Payment Time</th>
                  <th scope="col">Actions</th>
                  {/* <th scope="col">Date of Birth</th>
                <th scope="col">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {/* <tr>
              <th scope="row">100</th>
              <td>Raymond Shirt</td>
              <td>121</td>
              <td>1230</td>
              <td>Good!</td>
              <td>4</td>


            </tr> */}
                {payments.map((payment) => {
                  const dob = new Date(payment.pay_time);
                  const formattedDate = dob.toLocaleDateString();
                  const time = new Date(payment.pay_time)
                  const formattedTime = time.toLocaleTimeString();

                  return (
                    <tr key={payment.pay_id}>
                      <td>{payment.pay_id}</td>
                      <td>{payment.cid}</td>
                      <td>{payment.cname}</td>
                      <td>{payment.vc_id}</td>
                      <td>{payment.total_pay}</td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
                      <td className='d-flex justify-content-between'>
                        {/* <button className='btn btn-success'>read</button> */}
                        <button className='btn' onClick={() => handleOpen(payment.pay_id)}><PageviewOutlinedIcon /></button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={tableModalStyle}>
                            {
                              <div style={{ margin: 10, marginLeft: 10, marginRight: 10, justifyContent: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                  <h3>Virtual Cart</h3>
                                </div>
                                <table className="table table-hover mt-3 table-bordered " >
                                  <thead>
                                    <tr className='table-dark'>
                                      <th scope="col">Product ID</th>
                                      <th scope="col">Product Name</th>
                                      <th scope="col">Quantity</th>
                                      <th scope="col">Price</th>
                                      {/* <th scope="col">Date of Birth</th>
                <th scope="col">Actions</th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {payProd.map((prod) => {
                                      return (
                                        <tr key={prod.pid}>
                                          <td>{prod.pid}</td>
                                          <td>{prod.pname}</td>
                                          <td>{prod.quantity}</td>
                                          <td>{prod.price}</td>
                                        </tr>
                                      )
                                    })}

                                  </tbody>
                                </table>

                              </div>


                            }
                          </Box>
                        </Modal>
                      </td>
                    </tr>
                  );
                })}


              </tbody>
            </table>
          </div>
        </>
      </div>
    </div>
  )
}

export default Customers


