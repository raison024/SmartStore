import React, { useState } from 'react'
import './User.css'
import { QrReader } from 'react-qr-reader'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Axios from 'axios'
import { Button } from '@mui/material';

const Scan = (props) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  // const [delayScan , setDelayScan] = useState(500);
  const [scanStatus, setscanStatus] = useState("Scan a product");
  const [wrong, setwrong] = useState("")

  const check = () => {
    Axios.post('http://localhost:3002/api/getname', { name: name })
      .then((response) => {

        if (response.data.message) {
          setscanStatus(response.data.message)
          console.log("not found bro")
        } else {
          //insert into cart code
          navigate("/cart");
        }

        console.log(response);
      })
  }

  return (
    <div className="User-header User-column">
      <div className='CartScan-container'>
        <div className='User-row' style={{ color: 'white' }}>
          <Link to="/cart"><h1 style={{ color: 'white' }}>&larr;</h1></Link>
          <h1 style={{ fontSize: '25px' }}>Scan</h1>
          <Button variant='text' style={{ textTransform: 'none' }}>Delete</Button>
        </div>

        <div style={{ wdith: '100%', backgroundColor: 'unset', height: '60vh' }} className='User-column'>
          <div style={{ width: '70%' }}>
            <QrReader
              // delayScan={delayScan}
              constraints={{ facingMode: 'environment' }}
              onResult={(result, error) => {
                if (result) {
                  setName(result?.text);
                  setscanStatus('The product you have scanned is');
                  setwrong('Wrong Product? Please scan again ;)');
                  // check();
                }

                if (!!error) {
                  console.info(error);
                }
              }}
            />
          </div>
        </div>

        <div className='Cart-bottomsheet User-column' style={{color: 'white', backgroundColor: '#1565c0', height: '20vh'}}> 
          <p>{scanStatus}<br/>{name}</p>
          <input type="text" value={name} placeholder="Name" name='name' style={{display: 'none'}}></input>
          <Button onClick={check} variant="contained"
            style={{backgroundColor: '#fff', color: '#1565c0', 
              textTransform: 'none', borderRadius: '50px'}}>
              Add to Cart</Button>
          <p>{wrong}</p>
        </div>




      </div>
    </div>
  );
};

export default Scan;
