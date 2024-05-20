import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './homewithproducts.css';

export default function HomeWithProducts() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();

    const storedToken = localStorage.getItem("token"); // Fetch token from localStorage
    if (storedToken) {
      setToken(storedToken);
    }

    const handleProductDeleted = (event) => {
      fetchProducts();
    };

    window.addEventListener('productDeleted', handleProductDeleted);

    return () => {
      window.removeEventListener('productDeleted', handleProductDeleted);
    };
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
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
    <div className="whole-cont">
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.desc}</p>
              <p>Price: {product.price}</p>
              <p>Seller: {product.stuName}</p>
              <p>Contact: {product.phnNo}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-items" id='cart-items'>
        <div className="cart">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
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
    </div>
  );
}



// import React from 'react';
// import axios from 'axios';

// import './homewithproducts.css';

// export default function HomeWithProducts() {
//   const [products, setProducts] = React.useState([]);
//   const [cart, setCart] = React.useState([]);
//   const [token, setToken] = React.useState(""); // New state for token

//   React.useEffect(() => {
//     // Fetch products from MongoDB
//     axios
//       .get("http://localhost:5000/products")
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   React.useEffect(() => {
//     const storedToken = localStorage.getItem("token"); // Fetch token from localStorage
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const removeFromCart = (productToRemove) => {
//     setCart(cart.filter((product) => product !== productToRemove));
//   };

//   const getTotalPrice = () => {
//     return cart.reduce((total, product) => total + parseInt(product.price), 0);
//   };
  
//   const proceedToPayment = () => {
//     const totalPrice = getTotalPrice();
//     const cartItems = cart.map((item) => ({
//       name: item.name,
//       price: item.price,

     
//     }));
//     const queryParams = new URLSearchParams();
//     queryParams.set('cartItems', JSON.stringify(cartItems));
//     window.location.href = `/payment/${totalPrice}?${queryParams.toString()}`;
//   };
  
  
//   return (
//     <div className="whole-cont">
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product._id} className="product-card">
//             <img src={product.image} alt={product.name} />
//             <div className="product-details">
//               <h2>{product.name}</h2>
//               <p>{product.desc}</p>
//               <p>Price: {product.price}</p>
//               <p>Seller: {product.stuName}</p>
//               <p>Contact: {product.phnNo}</p>
//               <button onClick={() => addToCart(product)}>Add to Cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="cart-items" id='cart-items'>
//         <div className="cart">
//           {cart.map((item) => (
//             <div key={item.id} className="cart-item">
//               <img src={item.image} alt={item.name} />
//               <div className="cart-item-name">{item.name}</div>
//               <div>{item.price}</div>
//               <button onClick={() => removeFromCart(item)}>Remove</button>
//             </div>
//           ))}
//           <div className="cart-total">Total: {getTotalPrice()}</div>
//           <button onClick={proceedToPayment}>Proceed to Payment</button>
//         </div>
//       </div>
//     </div>
//   );
// }
