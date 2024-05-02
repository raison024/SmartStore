import * as React from 'react';
import { Button, Grid, Card, Box, CardActionArea, Fab } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './User.css';
import UserNavbar from '../../components/Navbar/UserNavbar';
import Poster from '../../assets/poster2.png';
import AddCartIcon from '@mui/icons-material/AddShoppingCart';
import { supabase } from '../../supabase';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Add } from '@mui/icons-material';




function UserHome() {
  const navigate = useNavigate();
  let { state } = useLocation();

  const [email, setEmail] = useState("No email");
  const [userId, setUserId] = useState();
  const [name, setName] = useState('Your name');
  const [num, setNum] = useState(0);
  const [prodList, setProdList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: products, error } = await supabase.from('products').select('*');
        if (error) {
          throw error;
        }
        setProdList(products);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    const fetchUserData = async () => {
      try {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id', 'username')
          .eq('email', email) // Assuming `email` is the variable containing the user's email
          .single();

        if (userError) {
          throw userError;
        }

        if (!userData) {
          console.log('User not found');
          return;
        }

        setName(userData.username);
        setUserId(userData.id);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };


    fetchProducts();
    fetchUserData();
    setEmail(state.userEmail);
  }, [state.userEmail]);

  const randomclick = () => {
    const randomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    setNum(randomNumberInRange(1, 200));
    navigate("/cart", { state: { cartId: randomNumberInRange(1, 200), userId: userId, userEmail: email } });
  };

  return (
    // <div style={{width: '100'}}>

    <div className='User-header User-column' style={{ justifyContent: 'flex-start' }}>
      <UserNavbar />
      <div className='User-paddingcontainer'>
        <img src={Poster} width='100%' className='User-poster' alt="poster"></img>
        <p style={{ display: 'none' }}>{num}</p>
        <h5 style={{ margin: '0' }}><br />All Products</h5>
        <br />
        <div className='User-grid'>

          {prodList.map((val, key) => (
            <Card sx={{ height: 240, maxWidth: 145, m: 1 }} margin='small' >
              <CardActionArea style={{height: '100%'}}>
                <CardMedia
                  component="img"
                  width="100%"
                  image={val.prod_img}
                  alt={val.prod_name}
                />
                <CardContent>
                  <Typography gutterBottom variant='subtitle2' component="div">
                    {val.prod_name}
                  </Typography>
                  <div className='User-row'>
                  <Typography variant="subtitle2" color="text.secondary">
                    Rs. {val.prod_price}
                  </Typography>
                  <Typography variant="caption" color="green">
                    {val.prod_quantity} left
                  </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
          {/* </Grid>
          </Box> */}
        </div>
      </div>

      <Fab color="primary" aria-label="add" onClick={randomclick}
       style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Add />
      </Fab>
    </div>
    // </div>
  );
}

export default UserHome;



{/* <Card sx={{ maxWidth: 345 }} key={key}>
<CardHeader
  // avatar={
  //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
  //     R
  //   </Avatar>
  // }
  // action={
  //   <IconButton aria-label="settings">
  //     <MoreVertIcon />
  //   </IconButton>
  // }
  title={val.prod_name}
  subheader={val.prod_price}
/>
<CardMedia
  component="img"
  height="220px"
  image={val.prod_img}
  alt={val.prod_name}
/>
{/* <CardContent>
  <Typography variant="body2" color="text.secondary">
    This impressive paella is a perfect party dish and a fun meal to cook
    together with your guests.
  </Typography>
</CardContent> */}
{/* <CardActions disableSpacing>
  <IconButton aria-label="add to favorites">
    <FavoriteIcon />
  </IconButton>
  <IconButton aria-label="share">
    <ShareIcon />
  </IconButton>
</CardActions> */}
{/* <div className='Card-column' style={{ height: '60%', width: '90%', backgroundColor: '#e9edff', marginTop: '10px', alignSelf: 'center', borderRadius: '10px' }}>
  <img src={val.prod_img} height='100%' alt={`product-${key}`} />
</div>
<div style={{ width: '90%' }}>
  <h4>{val.prod_name}</h4>
  <h4>Rs. {val.prod_price}</h4>
</div> */}
// </Card > 
