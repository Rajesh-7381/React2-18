import React from 'react'
import './Amazon.css';
import { useNavigate } from 'react-router-dom';
const Amazon = () => {
    const navigate=useNavigate();
    const ADDTOCART=()=>{
        navigate("/cart");
    }
  return (
    <div>
      <header>
        <div id='navbar'>
            <div className="nav-logo border-class">
                <div className="logo"></div>
            </div>
            <div className='nav-address border-class'>
                <p className='addressfirst'>Deliver to</p>
                <div className="add-icon">
                    <i class="bi bi-geo-alt-fill"></i>
                    <p className='addressecond'>India</p>
                </div>
            </div>
            <div className="nav-search">
                <select name="" id="searchselect">
                    <option value="">All</option>
                </select>
                <input type="text" placeholder='search amazon' id='searchinput'/>
                <div className="search-icon"><i class="bi bi-search"></i></div>
            </div>

            <div className="nav-sign border-class">
                <p><span>Hello Sign in</span></p>
                <p className='nav-second'>Account & lists</p>
            </div>

            <div className="nav-return border-class">
                <p><span>Returns</span></p>
                <p className='nav-second'>& orders</p>
            </div>
            <div className="nav-cart border-class">
            <i class="bi bi-cart-fill"></i>Cart
            </div>

            
        </div>
        <div className="panel">
                <div className="panel-all">
                    <i class="bi bi-menu-button-wide-fill"></i>All
                </div>
                <div className="panel-ops">
                    <p>Today's Seals</p>
                    <p>Customer Service</p>
                    <p>Registrey</p>
                    <p>Gift Cards</p>
                    <p>Sell</p>
                </div>
                <div className="panel-deals">
                    Shop deals In Electronics
                </div>
        </div>
        
      </header>
      <div className="hero-section">
        <div className="hero-msg">
            You are on amazon.com. You can also shop on Amazon India for millions of products with fast local delivery. <a href="https://www.amazon.com/"> Click here to go to amazon.in
            </a>
        </div>
      </div>
      <div className="shop-section">
        <div className="box1 box">
            <div id='box-image'>            
            <h2>Health And Personal Care</h2>
            </div>
            <p>see more</p>
            <button className='btn btn-primary w-75 ' id='btndata' onClick={ADDTOCART}>Add To Cart</button>
        </div>
        <div className="box2 box">
            <h2>Gaming accessories</h2>
            <div id='box-image2'>
                <p>see more</p>
            </div>
        </div>
        <div className="box3 box">
            <h2>Deals in PCs</h2>
            <div id='box-image2'>
                <p>see more</p>
            </div>
        </div>
        <div className="box4 box">
            <h2>Amazon Gadget Store</h2>
            <div id='box-image2'>
                <p>see more</p>
            </div>
        </div>
        <div className="box5 box">
            <h2>Fill your Easter basket with joy</h2>
            <div id='box-image2'>
                <p>see more</p>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Amazon
