import React, { useEffect, useState } from 'react';
import './Amazon.css';
import CardsData from './CardsData';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, DLT } from '../redux/actions/Action';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [price, setPrice] = useState(0);
  const getdata = useSelector((state) => state.cartReducer.carts);
  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(ADD(e));
    
  };

  const total = () => {
    let totalPrice = 0;
    getdata.forEach((item) => {
      totalPrice += item.price * item.qnty;
    });
    setPrice(totalPrice);
  };

  useEffect(() => {
    total();
  }, [getdata]);

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe("pk_test_51O4a72SHw6r4P7p3lRcPeLEdr5MlKBBt9O4hJGgIz5uHbedh6yzVa2YTv7dNcRazWeZIe9WmdYgjz3KjinL8ZvnC00IR7KUVcj");
      const body = {
        products: getdata
      };
      const headers = {
        "Content-Type": "application/json"
      };
      const response = await fetch("http://localhost:8081/api/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
      const session = await response.json();
  
      if (!session.id) {
        console.error("Session ID is undefined:", session);
        return;
      }
  
      const sessionId = session.id;
      alert(sessionId);
  
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId
      });
  
      if (result.error) {
        console.error("Error during redirection:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Add to Cart Project</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink>Cart ({getdata.length})</NavLink>
            {getdata.length ? (
              <div className="card_details" style={{ width: "24rem", padding: 10 }}>
                <table>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Restaurant Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getdata.map((item, index) => (
                      <tr key={index}>
                        <td><Link to={`/cartdetails/${item.id}`}><img src={item.imgdata} alt="" style={{ width: "100px", height: "100px" }} /></Link></td>
                        <td>{item.rname}</td>
                        <td>{item.price}</td>
                        <td>{item.qnty}</td>
                        <td style={{ color: "red", fontSize: "20", cursor: "pointer" }}><i className='bi bi-trash' onClick={() => dlt(item.id)}></i></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>Total Price: ₹{price}</div>
                <div className='text-end '><button className='btn btn-outline-success' type='button' onClick={makePayment}>checkout</button></div>
              </div>
            ) : (
              <div>Carts empty</div>
            )}
          </NavItem>
        </Nav>
      </Navbar>
      <div className="container mt-3">
        <div className="row d-flex justify-content-center align-items-">
          {CardsData.map((element, id) => (
            <div className="card mx-2 mt-4 card_style" style={{ width: "22rem", border: "none" }} key={id}>
              <img src={element.imgdata} className="card-img-top mt-3" alt={element.title} style={{ height: "16rem" }} />
              <div className="card-body">
                <p className="card-text">{element.rname}</p>
                <p className="card-text">₹{element.price}</p>
                <button className='btn btn-primary btn-sm col-lg-12' onClick={() => send(element)}>Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
