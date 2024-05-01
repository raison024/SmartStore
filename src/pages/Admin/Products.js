import React, { useState, useEffect, useRef } from 'react'
import SideBar from '../../components/Admin SideBar/SideBar'
import './Stores.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
// import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import QRCode from "qrcode.react";
import Axios from 'axios'
import ReactPaginate from 'react-paginate';


function Products() {

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Number of items to show per page
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  function handlePageChange({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const handleMapLoad = () => {
    setTimeout(() => {
      setIsMapLoaded(true);
    }, 2000); // Set a delay of 2 seconds (2000 milliseconds)
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center'
  };

  const qrCodeModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    width: 400,
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [img, setImg] = useState([])

  const [qropen, setQrOpen] = React.useState(false);
  const handleQrOpen = () => setQrOpen(true);
  const handleQrClose = () => setQrOpen(false);


  const [qr, setQr] = useState([])

  const downloadQR = () => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qr}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const [product, setProduct] = useState([])



  useEffect(() => {
    Axios.get('http://localhost:3003/api/get_product')
      .then((res) => {
        setProduct(res.data);
        setIsMapLoaded(true); // set isMapLoaded to true after data is loaded
      })
      .catch(err => console.log(err))
  }, []);

  const navigate = useNavigate();
  const offset = currentPage * itemsPerPage;
  const currentPageItems = product.slice(offset, offset + itemsPerPage);

  function handleDelete(pid) {
    console.log("Product id : " + pid)
    Axios.post('http://localhost:3003/api/deleteprod', { pid: pid })
      .then(res => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch(err => console.log(err));
  }


  function gotoadd() {
    navigate("/admin_products/add");
  }
  function gotoupdate(pid) {
    navigate(`/admin_products/update/${pid}`)
  }
  function handleImg(pimg) {
    console.log("Image address : " + pimg);
    setImg(pimg.toString('utf8'));
    console.log("After Image address : " + img);
    handleOpen();
  }
  function handleQr(pid) {
    console.log("Prodct Id : " + pid);
    // setImg(pimg.toString('utf8'));
    setQr(pid);
    handleQrOpen();
  }


  return (
    <div className='Admin'>
      <SideBar />

      <div class="AdminStores-container">
        <>

          <div className='p-3' >
            <div className='add_btn mt-2 p-2' style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
              <button className='btn btn-primary mt-2' onClick={gotoadd}>Add Product</button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' ,marginLeft:400}}>
                <h3>Products</h3>
              </div>

            </div>
            <table className="table table-hover mt-2 table-bordered" >
              <thead>
                <tr className='table-dark'>
                  <th scope="col">Product ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category ID</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Stocks</th>
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
                {/* <tr>
              <th scope="row">100</th>
              <td>Raymond Shirt</td>
              <td>121</td>
              <td>1230</td>
              <td>Good!</td>
              <td>4</td>


            </tr> */}
                {
                  currentPageItems.map((data) => (
                    <tr key={data.pid}>
                      <td>{data.pid}</td>
                      <td>{data.pname}</td>
                      <td>{data.cat_id}</td>
                      <td>{data.price}</td>
                      <td>{data.pdesc}</td>
                      <td>{data.STOCKS}</td>

                      <td className='d-flex justify-content-between'>
                        {/* <button className='btn btn-success'>read</button> */}
                        <button className='btn' onClick={() => { handleImg(data.pimg) }}><RemoveRedEyeOutlinedIcon /></button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            {
                              img && <img src={img} style={{ maxWidth: '100%', maxHeight: '100%' }} alt="Display Image" />
                            }
                          </Box>
                        </Modal>
                        <button className='btn' onClick={() => { handleQr(data.pid) }}><QrCodeIcon /></button>
                        <Modal
                          open={qropen}
                          onClose={handleQrClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={qrCodeModalStyle}>

                            <QRCode
                              id="123456"
                              style={{ height: "84%", maxWidth: "84%" }}
                              viewBox={`0 0 256 256`}
                              value={qr}
                              size={290}
                              level={"H"}
                              includeMargin={true}
                            />
                            <button className='btn' style={{ backgroundColor: 'rgb(21, 101, 192)', color: 'white', borderStyle: 'none' }}>
                              <a onClick={downloadQR}> Download QR </a>
                            </button>
                          </Box>
                        </Modal>
                        <button className='btn' onClick={() => gotoupdate(data.pid)}><EditIcon /></button>
                        <button className='btn' onClick={() => handleDelete(data.pid)}><DeleteIcon /></button>
                      </td>
                    </tr>
                  ))
                }
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
    </div>

  )
}

export default Products;
