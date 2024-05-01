import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import SideBar from '../../components/Admin SideBar/SideBar';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Stores.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Axios from 'axios';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items to show per page

  const [open, setOpen] = React.useState(false);

  function handleOpen(cid) {
    setSelectedCid(cid);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);
  const [selectedCid, setSelectedCid] = useState(null);

  const [payHis, setPayHis] = useState([])

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
    Axios.get('http://localhost:3003/api/read_customers')
      .then(res => {
        console.log(res);
        setCustomers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedCid) {
      Axios.get(`http://localhost:3003/api/get_user_payhis/${selectedCid}`)
        .then((res) => {
          console.log(res);
          setPayHis(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedCid]);

  function handlePageChange({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  function handleDelete(cid) {
    console.log("Customer id : " + cid)
    Axios.post('http://localhost:3003/api/delete_customers', { cid: cid })
      .then(res => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch(err => console.log(err));
  }

  const offset = currentPage * itemsPerPage;
  const currentPageItems = customers.slice(offset, offset + itemsPerPage);

  return (
    <div className='Admin'>
      <SideBar />
      <div class="AdminStores-container">
        <div className='Customers-right mt-4' >
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
          <h3>Customers</h3>
          </div>
          <table className="table table-hover mt-3 table-bordered ">
            <thead>
              <tr className='table-dark'>
                <th scope="col">Customer ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Gender</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((customer) => {
                const dob = new Date(customer.dob);
                const formattedDate = dob.toLocaleDateString();

                return (
                  <tr key={customer.cid}>
                    <td>{customer.cid}</td>
                    <td>{customer.cname}</td>
                    <td>{customer.cemail}</td>
                    <td>{customer.cphone}</td>
                    <td>{customer.gender}</td>
                    <td>{formattedDate}</td>
                    <td className='d-flex justify-content-between'>
                      <button className='btn' onClick={() => handleOpen(customer.cid)}c><PageviewOutlinedIcon /></button>
                      <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={tableModalStyle}>
                            {
                              <div style={{ margin: 10, marginLeft: 10, marginRight: 10, justifyContent: 'center' }}>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                <h3>Payment History</h3>
                                </div>
                                <table className="table table-hover mt-3 table-bordered " >
                                  <thead>
                                    <tr className='table-dark'>
                                      <th scope="col">Payment ID</th>
                                      <th scope="col">Virtual Cart ID</th>
                                      <th scope="col">Payment Date</th>
                                      <th scope="col">Payment Time</th>
                                      <th scope="col">Total Payment</th>
                                      {/* <th scope="col">Date of Birth</th>
                <th scope="col">Actions</th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
               {payHis.map((payment) => {
                  const dob = new Date(payment.pay_time);
                  const formattedDate = dob.toLocaleDateString();
                  const time = new Date(payment.pay_time)
                  const formattedTime = time.toLocaleTimeString();

                  return (
                    <tr key={payment.pay_id}>
                      <td>{payment.pay_id}</td>
                      <td>{payment.vc_id}</td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
                      <td>{payment.total_pay}</td>
                      </tr>
                         )
               } ) }
                                  </tbody>
                                </table>

                              </div>


                            }
                          </Box>
                        </Modal>
                      <button className='btn' onClick={() => handleDelete(customer.cid)}><DeleteIcon /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={Math.ceil(customers.length / itemsPerPage)}
            pageRangeDisplayed={10}
            marginPagesDisplayed={7}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            style={{display:'flex',flexDirection:''}}
          />
        </div>
      </div>
    </div>
  )
}

export default Customers;
