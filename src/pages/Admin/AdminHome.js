import React, { useEffect, useState } from 'react'
import './Stores.css'
import SideBar from '../../components/Admin SideBar/SideBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Revenue from '../../assets/Admin/Revenue.png'
import Scan from '../../assets/Admin/Scan.gif'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Axios from 'axios';




function AdminHome() {

  const [popProducts, setPopProducts] = useState([]);
  const [lastFeedback, setLastFeedback] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [recentPayments, setRecentPayments] = useState([])


  useEffect(() => {
    Axios.get('http://localhost:3003/api/read_pop_products')
      .then((res) => {
        setPopProducts(res.data);
      })
      .catch((err) => console.log('Error : ' + err));
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3003/api/read_rec_pay')
      .then((res) => {
        setRecentPayments(res.data);
      })
      .catch((err) => console.log('Error : ' + err));
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3003/api/recent_fb')
      .then((response) => {
        setLastFeedback(response.data.expectation);
        console.log("feedback : " + response.data.expectation);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lastFeedback]);

  useEffect(() => {
    Axios.get('http://localhost:3003/api/recent_week_rev')
      .then((response) => {
        setRevenue(response.data.week_pay);
        console.log("Revenue : " + revenue);
      })
  }, [revenue]);

  useEffect(() => {
    Axios.get('http://localhost:3003/api/get_total_customers')
      .then((response) => {
        setCustomers(response.data.total_cus);
        console.log("Customers : " + customers);
      })
  }, [revenue]);

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
                    <h6>
                      Past week's revenue
                    </h6>
                    <h4>&#x20B9;{revenue}</h4>
                    <CardMedia
                      component="img"
                      height="140"
                      image={Revenue}
                      alt="green iguana"
                    />
                  </CardContent>

                </CardActionArea>
                <CardActions>
                  {/* <Button size="small" color="primary">
                    <OpenInNewIcon style={{ fontSize: 'medium' }} />
                  </Button> */}
                </CardActions>
              </Card>
              <Card sx={{ maxWidth: 345, minWidth: 250, maxHeight: 350 }} style={{ marginLeft: '10px', borderRadius: 20 }}>
                <CardActionArea>
                  <CardContent>
                    <h6>
                      Total Customer Population
                    </h6>
                    <h4>{customers}</h4>
                    <CardMedia
                      component="img"
                      height="140"
                      image={Scan}
                      alt="green iguana"
                    />
                  </CardContent>
                  <div style={{ position: 'relative' }}>
                  </div>
                </CardActionArea>
                <CardActions>
                  {/* <Button size="small" color="primary">
                    <OpenInNewIcon style={{ fontSize: 'medium' }} />
                  </Button> */}
                </CardActions>
              </Card>

            </div>
          </Card>
            <h6>Recent Payments</h6>
          <table className="table table-hover mt-3 table-bordered " >
            <thead>
              <tr className='table-dark'>
                <th scope="col">Payment ID</th>
                <th scope="col">Virtual Cart ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Payment Date</th>
                <th scope="col">Payment Time</th>
                <th scope="col">Total Payment</th>
                {/* <th scope="col">Date of Birth</th>
                <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment) => {
                const dob = new Date(payment.pay_time);
                const formattedDate = dob.toLocaleDateString();
                const time = new Date(payment.pay_time)
                const formattedTime = time.toLocaleTimeString();

                return (
                  <tr key={payment.pay_id}>
                    <td>{payment.pay_id}</td>
                    <td>{payment.vc_id}</td>
                    <td>{payment.cname}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    <td>{payment.total_pay}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='AdminCardsRight'>
          <Card sx={{ maxWidth: 345, minWidth: 250 }} style={{ marginRight: '10px', borderRadius: 20, marginBottom: 20 }}>
            <CardActionArea>
              <CardContent>
                <h4>Popular Products</h4>
                <div className="RightCardsHead">
                  <p>Products</p>
                  {/* <p>Earnings</p> */}
                </div>
                <div className="PopProducts">
                  <div className="PopProducts">
                    {popProducts.map((product) => (
                      <div key={product.pid} className="PopProd">
                        <p>{product.pname}</p>
                        {/* <p>&#x20B9;{product.earnings}</p> */}
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
  )
}

export default AdminHome;