import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from 'react-rating-stars-component';
import '../../../src/index.scss';

function Product() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    image: null,
    name: '',
    price: '',
    description: '',
    rating: 0
  });
  const [file, setFile] = useState(null); 

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]); 
    setProduct({
      ...product,
      image: URL.createObjectURL(acceptedFiles[0])
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleRatingChange = (newRating) => {
    setProduct({
      ...product,
      rating: newRating
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("productttt1", product);
    if(product.name){
        let formData = new FormData();
        formData.append('title', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('file', file); 
        formData.append('rating', product.rating);
        formData.append('quantity', 1);
    
        try {
          const response = await axios.post('http://localhost:4343/api/createproduct', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('API response:', response.data);
          toast.success("Product created successfully!");
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } catch (error) {
          console.error('Error calling API:', error);
          toast.error("Something went wrong!");
        }
    }else{
        toast.error("please enter the value!");
    }
   
  };

  return (
    <div className="product-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Product Image:</label>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {product.image ? (
              <img src={product.image} alt="Product" className="preview-image" />
            ) : (
              <p>Drag 'n' drop an image, or click to select one</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name">Product Title:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Product Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Product Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Product Rating:</label>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={product.rating}
            onChange={handleRatingChange}
          />
        </div>
        <button type="submit" className="btn">Add Product</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Product;
