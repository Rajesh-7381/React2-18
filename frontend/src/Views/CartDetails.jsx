import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './magiczoomplus.js';
import './magiczoomplus.css';
import { useSelector, useDispatch } from 'react-redux';
import { ADD, DLT, Remove } from '../redux/actions/Action';
import ReactImageMagnify from 'react-magnify-image';

const CartDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const getdata = useSelector((state) => state.cartReducer.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    let comparedata = getdata.filter((item) => item.id === parseInt(id));
    setData(comparedata);
  }, [id, getdata]);

  // Delete data
  const deleteItem = (id) => {
    dispatch(DLT(id));
    navigate("/cart");
  }
  // quantity increment or decrement
  const send=(e)=>{
    dispatch(ADD(e));
  }

  const remove=(e)=>{
    dispatch(Remove(e))
  }

 

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Item Details Page</h2>
      {data.map((item, index) => (
        <div className="card" key={index}>
          <div className="row no-gutters">
            <div className="col-md-4">
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'Item',
                isFluidWidth: true,
                src: item.imgdata
              },
              largeImage: {
                src: item.imgdata,
                width: 1200,
                height: 1800
              }
            }} />
            </div>
            <div className="col-md-3">
              <div className="card-body text-start">
                <p className="card-text"><strong>Restaurant:</strong> {item.rname}</p>
                <p className="card-text"><strong>Price:</strong> ₹{item.price}</p>
                <p className="card-text"><strong>Dishes:</strong> {item.address}</p>
                <p className="card-text"><strong>Total:</strong> ₹{item.price  * item.qnty}</p>
              </div>
              <div className="mt-5 d-flex justify-content-between align-items-center" style={{width:"100",cursor:"pointer",background:"#ddd",color:"#111"}}>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => remove(item)}>-</button>
                <span style={{fontSize:"22"}}>{item.qnty}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => send(item)}>+</button>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card-body text-start">
                <p className="card-text"><strong>Rating:</strong> <span className='bg-success text-light ' style={{borderRadius:"5px",padding:"2px 5px"}}>{item.rating} <i className="bi bi-star-fill"></i></span></p>
                <p className="card-text"><strong>Review:</strong> {item.somedata}</p>
                <p className="card-text"><strong>Remove:</strong> <i className='bi bi-trash text-danger ' onClick={() => deleteItem(item.id)} style={{fontSize:"20",cursor:"pointer"}}></i></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartDetails;
