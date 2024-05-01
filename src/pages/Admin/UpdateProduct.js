import React, { useState, useEffect } from 'react';
import SideBar from '../../components/Admin SideBar/SideBar';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase'; // Import your Supabase client

function UpdateProduct() {
  const navigate = useNavigate();
  const { pid } = useParams();
  const [product, setProduct] = useState({ prod_name: 'hello', prod_category: 'jkbbnk', prod_price: 0, prod_quantity: 10, prod_img: 'jnjnkj', prod_desc: '' });

  // Getting the existing details from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('prod_id', pid)
          .single();
        if (productError) {
          throw productError;
        }
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };
    fetchProduct();
  }, [pid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      // Update product details
      const { error: updateError } = await supabase
        .from('products')
        .update({
          prod_name: product.prod_name,
          prod_category: product.prod_category,
          prod_price: product.prod_price,
          prod_quantity: product.prod_quantity,
          prod_img: product.prod_img,
          prod_desc: product.prod_desc
        })
        .eq('prod_id', pid);
        navigate('/admin_products');
      if (updateError) {
        throw updateError;
      }
      
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  return (
    <div className="Admin">
      <SideBar />
      <div className="AdminStores-container">
        <div className="container">
          <form onSubmit={handleUpdate} className="prodForm">
            <div className="row">
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="name">Product Name</label>
                <input type="text" className="form-control" placeholder="Enter product name" name="prod_name" value={product.prod_name} onChange={handleChange} />
              </div>

              <div className="mb-4 col-lg-6 col-md-6 col-12">
                <label htmlFor="">Category</label>&nbsp;
                <input type="text" className="form-control" placeholder="Enter category name" name="prod_category" value={product.prod_category} onChange={handleChange} />
              </div>

              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="name">Price</label>
                <input type="number" className="form-control" placeholder="Enter the price of the product" name="prod_price" value={product.prod_price} onChange={handleChange} />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="name">Stocks</label>
                <input type="number" className="form-control" placeholder="Enter the stocks of the product" name="prod_quantity" value={product.prod_quantity} onChange={handleChange} />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="name ">Product Image Link</label>
                <input type="text" className="form-control" placeholder="Enter the image link" name="prod_img" value={product.prod_img} onChange={handleChange} />
              </div>
              <div className="mb-3 col-lg-12 col-md-12 col-12">
                <label> Product Description </label>
                <br />
                <textarea name="prod_desc" cols="70" rows="5" value={product.prod_desc} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3 col-lg-6 col-md-12 col-12">
                <button type="submit" className="btn btn-primary mt-4">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
