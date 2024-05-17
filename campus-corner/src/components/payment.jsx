import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './payment.css';
import FakePayment from './FakePayment'; // Import the FakePayment component

export default function Payment() {
  const { price } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const cartItems = JSON.parse(queryParams.get('cartItems'));
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const cancelOrder = () => {
    window.location.href = '/home';
  };

  const proceedToPayment = () => {
    // You can perform any necessary validations here
    setPaymentCompleted(true);
  };

  return (
    <div>
      {paymentCompleted ? (
        <FakePayment />
      ) : (
        <div className='pcontainer'>
          <div className='img'>
            <img src='https://png.pngtree.com/thumb_back/fh260/background/20230705/pngtree-digitized-payment-3d-render-of-credit-card-and-contactless-nfc-transaction-image_3742456.jpg' alt='image' />
          </div>

          <p id='p1'>Order Summary</p>

          <p id='p4'>Experience the convenience of shopping for student products from Vishnu College community!</p>

          <div className='plane'>
            <p id='p2'>Product: {cartItems[0].name} <br /><span>Price: {price}</span></p>
          </div>

          <button id='btn1' onClick={proceedToPayment}>Proceed to Payment</button>
          <button id='btn2' onClick={cancelOrder}>Cancel Order</button>
        </div>
      )}
    </div>
  );
}
