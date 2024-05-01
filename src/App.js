import './App.css';
import Login from './pages/Auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import UserHome from './pages/User/UserHome';
import Scan from './pages/User/Scan';
import Cart from './pages/User/Cart';

import AdminLogin from './pages/Admin/AdminLogin';
import AdminHome  from './pages/Admin/AdminHome';
import Stores from '../src/pages/Admin/Stores'
import Products from './pages/Admin/Products'
import Customers from './pages/Admin/Customers'
import Payments from './pages/Admin/Payments'
import AddProduct from './pages/Admin/AddProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Categories from '../src/pages/Admin/Categories';
import Feedbacks from './pages/Admin/Feedback';
import Account from './pages/User/Account';
import History from './pages/User/History';
import Feedback from './pages/User/Feedback';
import ProductDetails from './pages/User/ProductDetails';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/account" element={<Account />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<History />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/productdetails" element={<ProductDetails/>} />
        
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome/>}/>
        <Route exact path="/admin_stores" element={<Stores />} />
        <Route exact path="/admin_products" element={<Products />} />
        <Route exact path="/admin_products/add" element={<AddProduct />} />
        <Route exact path="/admin_products/update/:pid" element={<UpdateProduct />} />
        <Route exact path="/admin_customers" element={<Customers />} />
        <Route exact path="/admin_payments" element={<Payments />} />
        <Route exact path="/admin_category" element={<Categories/>} />
        <Route exact path="/admin_feedbacks" element={<Feedbacks/>} />
      </Routes>
    </BrowserRouter>
  );
}

