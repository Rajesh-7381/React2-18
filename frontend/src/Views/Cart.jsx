import React from 'react'
import './Amazon.css';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51O4a72SHw6r4P7p3lRcPeLEdr5MlKBBt9O4hJGgIz5uHbedh6yzVa2YTv7dNcRazWeZIe9WmdYgjz3KjinL8ZvnC00IR7KUVcj');


const Cart = () => {
  const payment = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: 'price_id', quantity: 1 }],
      mode: 'payment',
      successUrl: 'https://your-website.com/success',
      cancelUrl: 'https://your-website.com/cancel',
    
  });
}
  return (
    <div>
      <div className="small-container cart-page">
        <table>
          <tr>
            <th>product</th>
            <th>quantity</th>
            <th>subtotal</th>
          </tr>
          <tr>
            <td>
              <div className='box1 cart-info'>
                <p>NOT BOILED</p>
              </div>
            </td>
            <td><input type="number" value="1" /></td>
            
            <td>$50.00</td>
          </tr>
        </table>
        <div className="total-price">
          <table>
            <tr>
              <td>subtotal</td>
              <td>$50.00</td>
            </tr>
             <tr>
              <td>tax</td>
              <td>$20.00</td>
             </tr> 
              <tr>
                <td>total</td>
                <td>$70.00</td>
              </tr>   
              <tr>
              <td><button onClick={payment} className='btn btn-primary'>PAY</button></td>
              </tr>      

          </table>
        </div>
      </div>
    </div>
  )
}

export default Cart