import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import SideBar from '../../components/Admin SideBar/SideBar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { supabase } from '../../supabase'; // Import your Supabase client

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items to show per page
  const [open, setOpen] = useState(false);
  const [selectedCid, setSelectedCid] = useState(null);
  const [payHis, setPayHis] = useState([]);

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
    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) {
          throw error;
        }
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error.message);
      }
    };
    fetchCustomers();
  }, []);

  async function fetchPaymentHistory(cid) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', cid);
      if (error) {
        throw error;
      }
      setPayHis(data);
    } catch (error) {
      console.error('Error fetching payment history:', error.message);
    }
  }

  useEffect(() => {
    if (selectedCid) {
      fetchPaymentHistory(selectedCid);
    }
  }, [selectedCid]);

  function handlePageChange({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  async function handleDelete(cid) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', cid);
      if (error) {
        throw error;
      }
      const updatedCustomers = customers.filter((customer) => customer.id !== cid);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error deleting customer:', error.message);
    }
  }

  const offset = currentPage * itemsPerPage;
  const currentPageItems = customers.slice(offset, offset + itemsPerPage);

  return (
    <div className='Admin'>
      <SideBar />
      <div class="AdminStores-container">
        <div className='Customers-right mt-4' >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h3>Customers</h3>
          </div>
          <table className="table table-hover mt-3 table-bordered ">
            <thead>
              <tr className='table-dark'>
                <th scope="col">Customer ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((customer) => {
                const dob = new Date(customer.dob);
                const formattedDate = dob.toLocaleDateString();

                return (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.username}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phno}</td>
                    <td>{formattedDate}</td>
                    <td className='d-flex justify-content-between'>
                      {/* <button className='btn' onClick={() => setSelectedCid(customer.id)}><PageviewOutlinedIcon /></button> */}
                      <Modal
                        open={selectedCid === customer.id}
                        onClose={() => setSelectedCid(null)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={tableModalStyle}>
                          {/* Add payment history table here */}
                        </Box>
                      </Modal>
                      <button className='btn' onClick={() => handleDelete(customer.id)}><DeleteIcon /></button>
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
            style={{ display: 'flex', flexDirection: '' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Customers;
