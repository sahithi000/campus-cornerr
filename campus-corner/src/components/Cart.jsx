// Cart.jsx

import React, { useState, useEffect } from 'react';
import './Cart.css'; // Create and import your CSS file

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter((product) => product !== productToRemove);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + parseInt(product.price), 0);
  };

  const proceedToPayment = () => {
    const totalPrice = getTotalPrice();
    const cartItems = cart.map((item) => ({
      name: item.name,
      price: item.price,
    }));
    const queryParams = new URLSearchParams();
    queryParams.set('cartItems', JSON.stringify(cartItems));
    window.location.href = `/payment/${totalPrice}?${queryParams.toString()}`;
  };

  return (
    <div className="cart-items" id='cart-items'>
      <div className="cart">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-name">{item.name}</div>
            <div>{item.price}</div>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))}
        <div className="cart-total">Total: {getTotalPrice()}</div>
        <button onClick={proceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Cart;
