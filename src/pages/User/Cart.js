import React, { useState, useEffect } from 'react'
import './User.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Fab, IconButton, Box, Typography, Modal, Snackbar, TextField, hexToRgb } from '@mui/material'
import { QrCodeScanner, ArrowForward, IndeterminateCheckBox, AddBox, Close, Delete } from '@mui/icons-material/';
import BackButton from '../../components/BackButton/BackButton';
import Axios from 'axios';
import Shampoo from '../../assets/shampoo.png';
import { QrReader } from 'react-qr-reader';
import Card from '../../assets/card.png';
import { Scanner } from '@yudiel/react-qr-scanner';
import { supabase } from '../../supabase';
import QrReader2 from "react-web-qr-reader";

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

function Cart() {

  let { state } = useLocation();
  const navigate = useNavigate();

  //Modal Open/Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  }

  //Modal Open/Close
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false); 
    window.location.reload(false);
  }

  const [name, setName] = useState("");
  const [scanStatus, setscanStatus] = useState("Scan a product");
  const [wrong, setwrong] = useState("");
  const [prodname, setprodname] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [maxquantity, setMaxQuantity] = useState(1); // Initialize with a default value of 20
  const [cartList, setCartList] = useState([]);
  const [prodList, setProdList] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {

    const fetchCartProducts = async () => {
      try {
        const { data: cartItems, error } = await supabase
          .from('cart')
          .select('prod_id, prod_quantity')
          .eq('cart_id', state.cartId);
        if (error) {
          throw error;
        }

        const productIds = cartItems.map(item => item.prod_id);

        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('prod_id, prod_name, prod_price, prod_img')
          .in('prod_id', productIds);
        if (productsError) {
          throw productsError;
        }

        const cartProducts = cartItems.map(cartItem => {
          const product = products.find(p => p.prod_id === cartItem.prod_id);
          return {
            ...cartItem,
            prod_name: product.prod_name,
            prod_price: product.prod_price,
            prod_img: product.prod_img
          };
        });

        setCartList(cartProducts);
        const totalItems = cartProducts.reduce((total, item) => total + item.prod_quantity, 0);
      setTotalItems(totalItems);
      } catch (error) {
        console.error('Error fetching cart products:', error.message);
      }
    }

    const calculateTotalPrice = () => {
      let totalPrice = 0;
      cartList.forEach(item => {
        totalPrice += item.prod_price * item.prod_quantity;
      });
      setTotalPrice(totalPrice);
    };

    fetchCartProducts();
    calculateTotalPrice();

    if (name) {
      check(name);
    }

  }, [name, maxquantity, state.cartId, state.userEmail, state.userId, cartList]);


  const check = async () => {
    try {
      console.log('Value of name:', name);
      const id = parseInt(name);
      const { data: productData, error } = await supabase
        .from('products')
        .select('prod_name', 'prod_quantity')
        .eq('prod_id', id) // Case-insensitive search for product name
        .single();

      if (error) {
        console.error('Error fetching products:', error.message);
        return;
      }
      setprodname(productData.prod_name);
      setMaxQuantity(productData.prod_quantity);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const insert = async () => {
    const id = parseInt(name);
    console.log("mx maxquantity:", maxquantity);
    console.log("mx quantity:", quantity);
    const updatedQuantity = parseInt(maxquantity) - parseInt(quantity);
    console.log("mx This is the updated quantity: " + updatedQuantity);
    try {
      console.log("Insertion values: " + id + " " + state.userEmail + " " + state.cartId + " " + quantity);
      const { error } = await supabase
        .from('cart')
        .insert({ prod_id: id, user_email: state.userEmail, cart_id: state.cartId, prod_quantity: quantity })

      if (error) {
        console.error('Error fetching products:', error.message);
        return;
      }
      console.log("inserted success");
    } catch (error) {
      console.error('Error:', error.message);
    }
    // const { error } = await supabase
    //   .from('products')
    //   .update({ prod_quantity: updatedQuantity })
    //   .eq('prod_id', id);
  }

  const handleAddQuantity = async (prodId, prodQuantity) => {
    const updatedQuantity = prodQuantity + 1;
    console.log("PS current quant: "+prodQuantity);
    console.log("PS updated quant: "+updatedQuantity);
    setQuantity(updatedQuantity);

    // Update quantity in the cart table
    try {
      await supabase
        .from('cart')
        .update({ prod_quantity: updatedQuantity })
        .eq('prod_id', prodId)
        .eq('cart_id', state.cartId);
    } catch (error) {
      console.error('PS Error updating quantity:', error.message);
    }
    // window.location.reload(false);
  };

  const handleSubtractQuantity = async (prodId, prodQuantity) => {
    const updatedQuantity = prodQuantity - 1;
    console.log("PS current quant: "+prodQuantity);
    console.log("PS updated quant: "+updatedQuantity);
    if (updatedQuantity < 1) return; // Ensure quantity doesn't go below 1

    setQuantity(updatedQuantity);
  
    // Update quantity in the cart table
    try {
      await supabase
        .from('cart')
        .update({ prod_quantity: updatedQuantity })
        .eq('prod_id', prodId)
        .eq('cart_id', state.cartId);
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
    // window.location.reload(false);
  };


  const handlepayment = async () => {
    try {
      const currentDate = new Date().toISOString();
      console.log("Insertion values: " + state.cartId + " " + totalprice + " " + 0 + " " + state.userEmail);
      const { error } = await supabase
        .from('payments')
        .insert({ cart_id: state.cartId, payment_date: currentDate, payment_amount: totalprice, payment_status: 0, user_email: state.userEmail })

      if (error) {
        console.error('Error fetching payment:', error.message);
        return;
      }
      console.log("inserted success");
      setOpen2(false);
      alert("Payment completed successfully")
      alert.onClose(navigate("/home", { state: { userEmail: state.userEmail } }));
      window.location.reload(false);
    } catch (error) {
      console.error('Error:', error.message);
    }

  }

  function goback() {
    navigate("/home", { state: { userEmail: state.userEmail } });
  }

  const deleteall = async () => {
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('cart_id', state.cartId);

      if (error) {
        console.error('Error deleting cart:', error.message);
        return;
      }
      window.location.reload(false);
      console.log("deleted success");
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return (
    <div className='User-header User-column' style={{ height: '100vh', justifyContent: 'flex-start' }}>
      <div className='CartScan-container'>
        <div className='User-row' style={{ padding: 10, alignItems: 'center' }}>
          <a onClick={goback} style={{ textDecoration: 'none', margin: 0 }}><h1>&larr;</h1></a>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Your Cart</div>
          <IconButton aria-label="delete" size="medium" onClick={deleteall}>
            <Delete fontSize="inherit" />
          </IconButton>
        </div>

        {/* <p>{state.cartId}</p>
        <p>{state.userEmail} + {state.userId}</p> */}

        <div className='Cart-itemscroll'>
          {cartList.map((val, key) => {

            return (
              <div className='Cart-itemsContainer'>
                <img src={val.prod_img} height='100%'
                  style={{ padding: '4px', backgroundColor: '#e9edff', borderRadius: '5px' }}>
                </img>
                <p style={{ width: 240}}>{val.prod_name}</p>
                <p style={{ width: 50}}>Rs. {val.prod_price}</p>
                <div style={{ height: '40px' }} className='User-row'>
                  <IconButton aria-label="Remove" color='primary' onClick={() => handleSubtractQuantity(val.prod_id, val.prod_quantity)}>
                    <IndeterminateCheckBox />
                  </IconButton>
                  <p>{val.prod_quantity}</p>
                  <IconButton aria-label="Add" color='primary' onClick={() => handleAddQuantity(val.prod_id, val.prod_quantity)}>
                    <AddBox />
                  </IconButton>
                </div>
              </div>
            )
          })}
        </div>

        <div className='Cart-bottomsheet'>
          <div className='Cart-spacerow'>
            <div>
              <p>No of Items</p>
              <p>Total Amount</p>
              {/* <p style={{ fontWeight: 'bold', color: '#1565c0' }}>View Bill</p> */}
            </div>
            <div>
              <p>{totalItems}</p>
              {/* <p>299</p> */}
              <p>Rs. {totalprice}</p>

            </div>
          </div>

          <div className='Cart-spacerow'>
            {/* <Link to="/scan" className='Cart-fab'> */}
            <div className='Cart-fab'>
              <Fab color="success" aria-label='scan' onClick={handleOpen}>
                <QrCodeScanner />
              </Fab>
            </div>
            {/* </Link> */}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div style={{ width: '100%' }}>
                  <QrReader
                    constraints = {{
                      facingMode: { exact: "environment" },
                    }}
                    // delayScan={delayScan}
                    onResult={(result, error) => {
                      if (!!result) {
                        setName(result?.text);
                        setscanStatus('The product you have scanned is: ');
                        setwrong('Wrong Product? Please scan again ;)');
                      }

                      if (!!error) {
                        console.info(error);
                      }
                    }}
                    style={{ width: '100%' }}
                  />
                  {/* <Scanner
                    onResult={(result) => {
                      setName(result);
                        console.log("Value after scan "+name);
                        setscanStatus('The product you have scanned is');
                        setwrong('Wrong Product? Please scan again ;)');
                        check();
                    }}
                    onError={(error) => console.log(error?.message)}
                  /> */}
                  {/* <QrReader2
                  /> */}
                </div>
                <div className='User-column'>
                  <p>{scanStatus} {prodname}</p>
                  <TextField id="quantity" label="Set Quantity" variant="standard"
                    sx={{ m: 2 }} defaultValue="1" type='number'
                    value={quantity}
                    InputProps={{
                      inputProps: {
                        max: maxquantity, min: 1
                      }
                    }}
                    onChange={(e) => setQuantity(parseInt(e.target.value))} />
                  <input type="text" value={name} placeholder="Name" name='name' style={{ display: 'none' }}></input>
                  <Button onClick={insert} variant="contained"
                    style={{
                      backgroundColor: '#fff', color: '#1565c0',
                      textTransform: 'none', borderRadius: '50px'
                    }}>
                    Add to Cart</Button>
                  <p>{wrong}</p>
                </div>
              </Box>
            </Modal>


            <Button variant='contained'
              onClick={handleOpen2}
              style={{
                width: '100%', textTransform: 'none',
                height: '50px', borderRadius: '50px'
              }}>
              Proceed to Checkout
            </Button>

            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className='User-column'>
                  <h4>Payment Page</h4>
                  <img src={Card} height='200px'></img>
                  <TextField label="Card No"
                    variant="outlined" fullWidth margin='normal' size='small'
                    type='email'
                  />
                  <TextField label="CVV"
                    variant="outlined" fullWidth margin='normal' size='small'
                    type='email'
                  />
                  <p><br />Total Items taken: {cartList.length}</p>
                  <p>Total amount: Rs.{totalprice}</p>

                  <input type="text" value={totalprice} placeholder="Name" name='total' style={{ display: 'none' }}></input>

                  <Button variant='contained'
                    onClick={handlepayment}
                    style={{
                      width: '100%', textTransform: 'none',
                      height: '50px', borderRadius: '50px'
                    }}>
                    Complete Payment
                  </Button>

                </div>
              </Box>
            </Modal>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart