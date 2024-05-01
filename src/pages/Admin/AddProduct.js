import React, { useState, useEffect } from 'react';
import SideBar from '../../components/Admin SideBar/SideBar';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase'; // Import your Supabase client

function AddProduct() {
  const [inpval, setINP] = useState({
    prod_name: "",
    prod_category: "",
    prod_price: 0,
    prod_quantity: 0,
    prod_desc: "",
    prod_img: ""
  });

  const navigate = useNavigate();
  const [submitStatus, setSubmitStatus] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: categoriesData, error } = await supabase
          .from('categories')
          .select('*');
        if (error) {
          throw error;
        }
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };
    fetchCategories();
  }, []);

  const setData = (e) => {
    const { name, value } = e.target;
    setINP((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  const submit = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([inpval]);
      if (error) {
        throw error;
      }
      setSubmitStatus("Product added successfully.");
      setTimeout(() => {
        navigate("/admin_home");
      }, 2000);
    } catch (error) {
      console.error('Error adding product:', error.message);
      setSubmitStatus("Failed to add product.");
    }
  };

  return (
    <div className="Admin">
      <SideBar />
      <div className='AdminStores-container'>
        <form className='prodForm'>
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name">Product Name</label>
              <input type="text" className="form-control" placeholder="Enter product name" name="prod_name" onChange={setData} value={inpval.prod_name} required />
            </div>
            <div className="mb-4 col-lg-6 col-md-6 col-12">
              <label htmlFor="">Category</label>&nbsp;
              <input type="text" className="form-control" placeholder="Enter the category of the product" name="prod_category" onChange={setData} value={inpval.prod_category} required />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name">Price</label>
              <input type="number" className="form-control" placeholder="Enter the price of the product" name="prod_price" onChange={setData} value={inpval.prod_price} required />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name">Stock</label>
              <input type="number" className="form-control" placeholder="Enter the quantity of the product" name="prod_quantity" onChange={setData} value={inpval.prod_quantity} required />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name ">Product Image Link</label>
              <input type="text" className="form-control" placeholder="Enter the image link" name="prod_img" onChange={setData} value={inpval.prod_img} required />
            </div>
            <div className="mb-3 col-lg-12 col-md-12 col-12">
              <label>Product Description</label>
              <br />
              <textarea name="prod_desc" cols="70" rows="5" onChange={setData} value={inpval.prod_desc} required></textarea>
            </div>
            <div className="mb-3 col-lg-6 col-md-12 col-12">
              <button type="button" className="btn btn-primary mt-4" onClick={submit}>Submit</button>
            </div>
          </div>
        </form>
      </div>
      <h6>{submitStatus}</h6>
    </div>
  );
}

export default AddProduct;
