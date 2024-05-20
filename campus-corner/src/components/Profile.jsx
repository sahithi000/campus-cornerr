import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import Sidebar from "./Sidebar";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({ username: '', email: '' });
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user-details', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchUserProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user-products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserProducts(response.data);
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };

    fetchUserDetails();
    fetchUserProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/delete-product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove the deleted product from the state
      setUserProducts(userProducts.filter(product => product._id !== productId));
      // Dispatch a custom event to notify that a product has been deleted
      window.dispatchEvent(new CustomEvent('productDeleted', { detail: { productId } }));
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="profile-container">
        <div className="profile-card">
          <h2>Hello {userDetails.username}</h2>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
        </div>
        <div className="product-list">
          {userProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.desc}</p>
                <p>Price: {product.price}</p>
                <p>Seller: {product.stuName}</p>
                <p>Contact: {product.phnNo}</p>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
