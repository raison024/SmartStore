import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import { Button } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AuthImg from '../../assets/Auth3.png'
import ScanImg from '../../assets/Scan1.png'
import HomeText3 from '../../assets/Home-text.png'
import { supabase, checkSupabaseConnection } from '../../supabase';


function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const isConnected = await checkSupabaseConnection();
      if (isConnected) {
        try {
          const { data, error } = await supabase.from('products').select('*');
          if (error) {
            throw error;
          }
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      } else {
        console.log('Supabase is not connected');
      }
    }

    fetchData();
  }, []);
  return (
    <div className='Home-header Home-column'>

      <Navbar />

      {/* First Page */}
      <div className='Home-page Home-row'>
        <div className='Homepage1-container Home-column'>
          <div style={{ width: '80%', textAlign: 'left' }}>
          <div style={{ width: '40%', textAlign: 'left' }}>
            <h1>Simplify Your Shopping with <span style={{ color: '#1565c0' }}>Shop Smart</span></h1>
            <p style={{ color: '#fff' }}>We are excited to introduce our self-checkout system, which is designed to provide our customers
              with a convenient and efficient shopping experience.</p><br />

            <div className='Home-row' style={{ justifyContent: 'flex-start' }} >
              <Button variant='contained' style={{ textTransform: 'none', width: '150px', height: '40px' }} >Get Started</Button>
              <Button variant="text" startIcon={<PlayCircleOutlineIcon />}
                style={{ margin: '10px', color: 'white', textTransform: 'none' }}>
                Watch Video
              </Button>
            </div>

            <img src={HomeText3} style={{marginTop: '20px'}}></img>

            {/* <Paper elevation={1} component="form"
              sx={{
                p: '4px 4px', display: 'flex', alignItems: 'center',
                width: '90%', borderRadius: '50px', height: 35, marginTop: '30px', background: 'white'
              }}>
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Find the nearest store"
                inputProps={{ 'aria-label': 'search stores' }} startAdornment={
                  <InputAdornment position="start">
                    <FmdGoodIcon />
                  </InputAdornment>
                } />
              <Button variant='contained' style={{ borderRadius: '50px', textTransform: 'none' }}>
                Search
              </Button>
            </Paper> */}
            </div>
          </div>
        </div>

        {/* <div className='Homepage1-container Home-column' style={{ backgroundColor: '#15a2cc' }}>
          <img src={HomeImg} width="75%"></img>
        </div> */}

        {/* <div className='Home-scrolldown'>&darr; Scroll down to learn more</div> */}
      </div>

      {/* Second Page */}
      <div className='Home-page Home-column'>
        <h1>How it works?</h1>
        <div className='Home-row'>
          {/* <div className='Homepage1-container Home-column'> */}
            <img src={AuthImg} width='35%'></img>
          {/* </div> */}
          <div className='Homepage2-container Home-column'>
            <h2>Authenticate yourself</h2>
            <p>The first step to get started is to enter your details and identify yourself.</p>
            <p className='Home-row'><h4 className='Home-step'>01</h4>New User? Click on Sign Up.</p>
            <p className='Home-row'><h4 className='Home-step'>02</h4>Enter the required info during Sign up.</p>
            <p className='Home-row'><h4 className='Home-step'>03</h4>Already a user? Sign in to your account.</p>
            <p>Still confused? Learn more about it.</p>
            <Button variant='text' 
              style={{textTransform:'none', borderRadius: '100px', paddingBlock: '10px', 
              paddingInline: '18px', backgroundColor: 'rgba(0,0,0,0.1)', color: 'black', marginTop: '10px', fontSize: '12px'}}>
              Learn More
          </Button>
          </div>
        </div>
      </div>

       {/* Third Page */}
      <div className='Home-page Home-row'>
        <div className='Homepage2-container Home-column'>
          <h2>Scan and Go</h2>
          <p>Locate our nearest store and visit it after the first step is complete.</p>
          <p className='Home-row'><h4 className='Home-step'>04</h4>Locate our nearest store</p>
          <p className='Home-row'><h4 className='Home-step'>05</h4>Scan the products.</p>
          <p className='Home-row'><h4 className='Home-step'>06</h4>Pay the total amount in the cart.</p>
          <p>Still confused? Learn more about it.</p>
          <Button variant='text'
            style={{
              textTransform: 'none', borderRadius: '100px', paddingBlock: '10px',
              paddingInline: '18px', backgroundColor: 'rgba(0,0,0,0.1)', color: 'black', marginTop: '10px', fontSize: '12px'
            }}>
            Learn More
          </Button>
        </div>
        {/* <div className='Homepage1-container Home-column'> */}
          <img src={ScanImg} width='32%'></img>
        {/* </div> */}
      </div>
      
    </div>
  )
}

export default Home