import SideBar from '../../../src/components/Admin SideBar/SideBar'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Stores.css'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Axios from 'axios'



function Categories() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = useState([])
  const [newcategory, setNewCategory] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3003/api/read_categories')
      .then(res => {
        setCategory(res.data)
        // console.log(category)
      })
      .catch(err => console.log(err))
  }, []);

  const [submitStatus, setsubmitStatus] = useState("");

  const handleCategory = (e) => {

    const newCategory = [] // create a copy of the existing array
    newCategory.push({ cat_name: e.target.value }); // add the new category to the copy
    console.log(newCategory)
    setNewCategory(newCategory); // update the state with the new array
    console.log(newcategory[0])
  }

  function handleDelete(cat_id) {
    console.log("Category id : " + cat_id)
    Axios.post('http://localhost:3003/api/delete_categories', { cat_id: cat_id })
      .then(res => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch(err => console.log(err));
  }


  const submit = () => {
    if (newcategory[0] === undefined)
      window.location.reload(false);

    else {

      Axios.post('http://localhost:3003/api/add_categories', newcategory[0])
        .then((response) => {
          if (response.data.message) {
            setsubmitStatus(response.data.message)
            navigate("/admin_category");
            // window.location.reload(false);
          } else {
            window.location.reload(false);
          }
          console.log(response);
        })
    }

  }



  const navigate = useNavigate();

  return (
    <div className='Admin'>
      <SideBar />
      <div className="AdminStores-container">

        <div className='Categories-main'>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
            <Button onClick={handleOpen} variant="contained" className='Categories-btn' style={{ backgroundColor: 'rgb(21, 101, 192)' }} >Add Category</Button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginLeft: 160 }}>
              <h3>Categories</h3>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  ADD CATEGORY
                </Typography>
                <form action="">
                  <label htmlFor="cat_name">Category </label>
                  <input type="text" className='Category-add-sub-btn' name="cat_name" onChange={handleCategory} />
                  <Button variant="contained" className='Category-add-submit' onClick={submit} style={{ marginLeft: '15em', marginTop: '2em' }}>SUBMIT</Button>
                  <h1>{submitStatus}</h1>
                </form>
              </Box>
            </Modal>
          </div>
          <Stack spacing={2} direction="row">

          </Stack>
          <table className="table table-hover mt-3 table-bordered">
            <thead>
              <tr className='table-dark'>
                <th scope="col">Category ID</th>
                <th scope="col">Category Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                category.map((data, index) => (
                  <tr key={index}>
                    <td>{data.cat_id}</td>
                    <td>{data.cat_name}</td>
                    <td className='d-flex justify-content-center'>
                      <button className='btn ' onClick={() => handleDelete(data.cat_id)} style={{marginLeft:100}}><DeleteIcon /></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Categories

