import React, { useState, useEffect } from 'react';
import SideBar from '../../components/Admin SideBar/SideBar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import { supabase } from '../../supabase'; // Import your Supabase client

function Payments() {
  const [payments, setPayments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPayId, setSelectedPayId] = useState(null);
  const [payProd, setPayProd] = useState([]);

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
    const fetchPayments = async () => {
      try {
        const { data, error } = await supabase.from('payments').select('*');
        if (error) {
          throw error;
        }
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error.message);
      }
    };
    fetchPayments();
  }, []);

  async function fetchPaymentProducts(cartId) {
    try {
      const { data: cartData, error: cartError } = await supabase
        .from('cart')
        .select('*')
        .eq('cart_id', cartId);

      if (cartError) {
        throw cartError;
      }

      const products = [];

      for (const cartItem of cartData) {
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('prod_id', cartItem.prod_id)
          .single();

        if (productError) {
          throw productError;
        }

        products.push({
          ...productData,
          quantity: cartItem.prod_quantity,
          total_price: cartItem.prod_quantity * productData.prod_price,
        });
      }

      setPayProd(products);
    } catch (error) {
      console.error('Error fetching payment products:', error.message);
    }
  }

  const handleOpen = (cartId) => {
    setSelectedPayId(cartId);
    setOpen(true);
    fetchPaymentProducts(cartId);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPayId(null);
    setPayProd([]);
  };

  return (
    <div className='Admin'>
      <SideBar />
      <div className="AdminStores-container">
        <div className='Customers-right mt-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h3>Payments</h3>
          <table className="table table-hover mt-3 table-bordered ">
            <thead>
              <tr className='table-dark'>
                <th scope="col">Payment ID</th>
                <th scope="col">Customer ID</th>
                <th scope="col">Cart ID</th>
                <th scope="col">Total Payment</th>
                <th scope="col">Payment Date</th>
                <th scope="col">Payment Time</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.payment_id}>
                  <td>{payment.payment_id}</td>
                  <td>{payment.user_email}</td>
                  <td>{payment.cart_id}</td>
                  <td>{payment.payment_amount}</td>
                  <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                  <td>{new Date(payment.payment_date).toLocaleTimeString()}</td>
                  <td className='d-flex justify-content-between'>
                    <button className='btn' onClick={() => handleOpen(payment.cart_id)}><PageviewOutlinedIcon /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={tableModalStyle}>
              <div style={{ margin: 10, marginLeft: 10, marginRight: 10, justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h3>Cart</h3>
                </div>
                <table className="table table-hover mt-3 table-bordered">
                  <thead>
                    <tr className='table-dark'>
                      <th scope="col">Product ID</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payProd.map((prod) => (
                      <tr key={prod.prod_id}>
                        <td>{prod.prod_id}</td>
                        <td>{prod.prod_name}</td>
                        <td>{prod.quantity}</td>
                        <td>{prod.prod_price}</td>
                        <td>{prod.total_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Payments;
