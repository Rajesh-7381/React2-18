import React from 'react'
import './Amazon.css';

const Cart = () => {
  return (
    <div>
      <div className="small-container acrt-page">
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
              <td><button className='btn btn-primary'>PAY</button></td>
              </tr>      

          </table>
        </div>
      </div>
    </div>
  )
}

export default Cart