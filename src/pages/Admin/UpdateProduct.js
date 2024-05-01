import React, { useState, useEffect } from 'react'
import SideBar from '../../components/Admin SideBar/SideBar'
import './Stores'
import { useParams,useNavigate } from 'react-router-dom'
import Axios from 'axios'


function UpdateProduct() {

  const navigate = useNavigate();
  const { pid } = useParams();
  const [product, setProduct] = useState({ pname: 'hello', cat_name: 'jkbbnk', price: 0, STOCKS: 10, pimg: 'jnjnkj', pdesc: '' })

  const [categories, setCategories] = useState([]);


  //Getting the existing details from the backend
  useEffect(() => {
    Axios.get(`http://localhost:3003/api/read_update_product/${pid}`)
      .then(res => {
        // console.log("Stocks from database : " + res.data)
        setProduct(res.data)
        console.log(product)
        Axios.get('http://localhost:3003/api/read_cat_name')
          .then(response => {
            // console.log(response)
            setCategories(response.data);
            console.log(categories)
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(err => console.log(err))
  }, [])


  const handleChange = e => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Product Update : " + product.stocks)
    Axios.post(`http://localhost:3003/api/submit_update_product/${pid}`, product)
      .then(res => {console.log(res)
        navigate("/admin_products");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='Admin'>
      <SideBar />
      <div class="AdminStores-container">
        <div className='container'>
          {/* <NavLink to='/admin_products'>Hey</NavLink> */}
          <form onSubmit={handleSubmit} className='prodForm'>
            <div className="row">
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="name">Product Name</label>
                <input type="text" class="form-control" placeholder="Enter product name" name='pname' value={product.pname} onChange={handleChange} />

                {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
              </div>

              {/* Input Image
            <div className='inputImage'>
              <input type="file" multiple accept='image/*' onChange={onImageChange}/>
            </div> */}

              {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="name">Category</label>
                <input type="text" class="form-control" placeholder="Enter the category of the product" name='cat_name' value={product.cat_name} onChange={handleChange} />
              </div> */}
              <div class="mb-4 col-lg-6 col-md-6 col-12">

              <label htmlFor="">Category</label>&nbsp;
              <select id="category-select" name='cat_name' value={product.cat_name} onChange={handleChange} required>
                {categories.map(category => {
                    return (
                      <option key={category.cat_name} value={category.cat_name}>
                        {category.cat_name}
                      </option>
                    )
                  
                })}
              </select>

              </div>

              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="name">Price</label>
                <input type="number" class="form-control" placeholder="Enter the price of the product" name='price' value={product.price} onChange={handleChange} />
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="name">Stocks</label>
                <input type="number" class="form-control" placeholder="Enter the stocks of the product" name='STOCKS' value={product.STOCKS} onChange={handleChange} />
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="name ">Product Image Link</label>
                <input type="text" class="form-control" placeholder="Enter the image link" name='pimg' value={product.pimg} onChange={handleChange} />
              </div>
              <div className='mb-3 col-lg-12 col-md-12 col-12'>
                <label> Product Description </label>
                <br />
                <textarea name="pdesc" id="" cols="70" rows="5" value={product.pdesc} onChange={handleChange}></textarea>
              </div>
              <div className='mb-3 col-lg-6 col-md-12 col-12'>
                <button type="submit" class="btn btn-primary mt-4" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </form>
          {/* <p>{product}</p> */}
        </div>
        {/* <h1>{submitStatus}</h1> */}
      </div>
    </div>

  )
}

export default UpdateProduct