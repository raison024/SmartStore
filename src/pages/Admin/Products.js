import React, { useState, useEffect } from 'react';
import SideBar from '../../components/Admin SideBar/SideBar';
import './Stores.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import QRCode from "qrcode.react";
import ReactPaginate from 'react-paginate';
import { supabase } from '../../supabase'; // Import your Supabase client

function Products() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState('');
  const [qropen, setQrOpen] = useState(false);
  const [qr, setQr] = useState('');
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          throw error;
        }
        setProduct(data);
        setIsMapLoaded(true);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (prod_id) => {
    try {
      const { error } = await supabase.from('products').delete().eq('prod_id', prod_id);
      if (error) {
        throw error;
      }
      window.location.reload(false);
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  function handlePageChange({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const gotoadd = () => {
    navigate("/admin_products/add");
  };

  const gotoupdate = (prod_id) => {
    navigate(`/admin_products/update/${prod_id}`);
  };

  const handleImg = (pimg) => {
    setImg(pimg);
    setOpen(true);
  };

  const handleQr = (prod_id) => {
    setQr(prod_id);
    setQrOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleQrClose = () => setQrOpen(false);

  return (
    <div className='Admin'>
      <SideBar />
      <div className="AdminStores-container">
        <>
          <div className='p-3' >
            <div className='add_btn mt-2 p-2' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
              <button className='btn btn-primary mt-2' onClick={gotoadd}>Add Product</button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginLeft: 400 }}>
                <h3>Products</h3>
              </div>
            </div>
            <table className="table table-hover mt-2 table-bordered" >
              <thead>
                <tr className='table-dark'>
                  <th scope="col">Product ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  {/* <th scope="col">Description</th> */}
                  <th scope="col">Stock</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!isMapLoaded && (
                  <td colSpan={7}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <CircularProgress />
                    </Box>
                  </td>
                )}
                {product.map((data) => (
                  <tr key={data.prod_id}>
                    <td>{data.prod_id}</td>
                    <td>{data.prod_name}</td>
                    <td>{data.prod_category}</td>
                    <td>{data.prod_price}</td>
                    {/* <td>{data.prod_desc}</td> */}
                    <td>{data.prod_quantity}</td>
                    <td className='d-flex justify-content-between'>
                      <button className='btn' onClick={() => { handleImg(data.prod_img) }}><RemoveRedEyeOutlinedIcon /></button>
                      <button className='btn' onClick={() => { handleQr(data.prod_id) }}><QrCodeIcon /></button>
                      <button className='btn' onClick={() => gotoupdate(data.prod_id)}><EditIcon /></button>
                      <button className='btn' onClick={() => handleDelete(data.prod_id)}><DeleteIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              pageCount={Math.ceil(product.length / itemsPerPage)}
              pageRangeDisplayed={10}
              marginPagesDisplayed={7}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </>
      </div>

      {/* Modal to display product image */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <img src={img} alt="Product" style={{ width: '100%' }} />
        </Box>
      </Modal>

      {/* Modal to display QR code */}
      <Modal
        open={qropen}
        onClose={handleQrClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 200, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <QRCode value={qr} />
        </Box>
      </Modal>
    </div>
  );
}

export default Products;
