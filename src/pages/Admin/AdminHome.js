import React, { useEffect, useState } from 'react';
import './Stores.css';
import SideBar from '../../components/Admin SideBar/SideBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Revenue from '../../assets/Admin/Revenue.png';
import Scan from '../../assets/Admin/Scan.gif';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { supabase } from '../../supabase'; // Import your Supabase client

function AdminHome() {
  const [popProducts, setPopProducts] = useState([]);
  const [lastFeedback, setLastFeedback] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch popular products
        const { data: popProductsData, error: popProductsError } = await supabase.from('pop_products').select('*');
        if (popProductsError) console.log('Error fetching popular products:', popProductsError.message);
        else setPopProducts(popProductsData);

        // Fetch last feedback
        const { data: lastFeedbackData, error: lastFeedbackError } = await supabase.from('last_feedback').select('expectation');
        if (lastFeedbackError) console.log('Error fetching last feedback:', lastFeedbackError.message);
        else setLastFeedback(lastFeedbackData[0]?.expectation || '');

        // Fetch total revenue
        const { data: totalRevenueData, error: totalRevenueError } = await supabase
          .from('payments')
          .select('sum(payment_amount)');
        if (totalRevenueError) {
          console.log('Error fetching total revenue:', totalRevenueError.message);
        }
        else {
          setTotalRevenue(totalRevenueData[0]?.sum || 100);
        }
        console.log('Total Revenue Data:', totalRevenueData);

        // Fetch total customers
        const { count: totalCustomersCount, error: totalCustomersError } = await supabase.from('users').select('count');
        if (totalCustomersError) console.log('Error fetching total customers:', totalCustomersError.message);
        else setTotalCustomers(totalCustomersCount || 0);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  function goToProd() {
    navigate("/admin_products");
  }

  function goToFeed() {
    navigate("/admin_feedbacks");
  }

  return (
    <div className='Admin'>
      <SideBar />
      <div className='AdminStores-container' style={{ flexDirection: 'row' }}>
        <div className="AdminCardsLeftContainer">
          <Card sx={{ minHeight: 350, minWidth: 500 }} style={{ margin: '10px', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h4>Overview</h4>
            <div className="AdminCards">
              <Card sx={{ maxWidth: 345, minWidth: 250, maxHeight: 350 }} style={{ marginRight: '10px', borderRadius: 20 }}>
                <CardActionArea>
                  <CardContent>
                    <h6>Total Revenue</h6>
                    <h4>&#x20B9;{totalRevenue}</h4>
                    <CardMedia
                      component="img"
                      height="140"
                      image={Revenue}
                      alt="Total Revenue"
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ maxWidth: 345, minWidth: 250, maxHeight: 350 }} style={{ marginLeft: '10px', borderRadius: 20 }}>
                <CardActionArea>
                  <CardContent>
                    <h6>Total Customer Population</h6>
                    <h4>{totalCustomers}</h4>
                    <CardMedia
                      component="img"
                      height="140"
                      image={Scan}
                      alt="Total Customer Population"
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Card>

        </div>
        <div className='AdminCardsRight'>
          <Card sx={{ maxWidth: 345, minWidth: 250 }} style={{ marginRight: '10px', borderRadius: 20, marginBottom: 20 }}>
            <CardActionArea>
              <CardContent>
                <h4>Popular Products</h4>
                <div className="RightCardsHead">
                  <p>Products</p>
                </div>
                <div className="PopProducts">
                  <div className="PopProducts">
                    {popProducts.map((product) => (
                      <div key={product.pid} className="PopProd">
                        <p>{product.pname}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button size="small" color="primary" onClick={goToProd}>
                All Products
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345, minWidth: 250 }} style={{ marginRight: '10px', borderRadius: 20 }}>
            <CardActionArea>
              <CardContent>
                <h4>Latest Feedback</h4>
                <div className="RightCardsHead">
                  <h6 style={{ marginLeft: 10, marginTop: 10 }}>Expectation</h6>
                </div>
                <div className="RecentFeedback">
                  <p style={{ marginLeft: 10 }}>{lastFeedback}</p>
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button size="small" color="primary" onClick={goToFeed}>
                All Feedbacks
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
