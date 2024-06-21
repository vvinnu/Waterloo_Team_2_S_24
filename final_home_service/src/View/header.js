import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Script from './Script/script.js';

function Header() {
  const [userdata, setUserdata] = useState(null);
  const [service, setService] = useState([]);
  const [product, setProduct] = useState([]);
  const [serviceWishlist, setServiceWishlist] = useState(0);
  const [wishlist, setWishlist] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserdata(JSON.parse(storedUser));
    }
    setService(JSON.parse(localStorage.getItem('cart')) || []);
    setProduct(JSON.parse(localStorage.getItem('productcart')) || []);
  }, []);

  useEffect(() => {
    if (userdata) {
      fetchServiceWishlist();
      fetchProductWishlist();
    }
  }, [userdata]);

  const fetchServiceWishlist = () => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ u_id: userdata.u_id }),
      headers: { "Content-Type": "application/json" }
    };
    fetch('http://localhost:3001/getservicewishlist', requestOptions)
      .then(response => response.json())
      .then(data => setServiceWishlist(data));
  };

  const fetchProductWishlist = () => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ u_id: userdata.u_id }),
      headers: { "Content-Type": "application/json" }
    };
    fetch('http://localhost:3001/getproductwishlist', requestOptions)
      .then(response => response.json())
      .then(data => setWishlist(data));
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('productcart');
    setUserdata(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header id="header" className="fixed-top header-scrolled">
        <div className="container d-flex align-items-center justify-content-lg-between">
          <a href="/" className="logo me-auto me-lg-0">
            <img src="%PUBLIC_URL%/../../Gp/assets/img/logo4-removebg-preview.png" alt="" height="50px" />
          </a>

          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              <Link to="/" className="nav-link scrollto">Home</Link>
              <Link to="/About" className="nav-link scrollto">About us</Link>
              <Link to="/Service" className="nav-link scrollto">Service</Link>
              <Link to="/product" className="nav-link scrollto">Product</Link>
              <Link to="/Team" className="nav-link scrollto">Team</Link>
              <Link to="/Contact" className="nav-link scrollto">Contact</Link>
              {userdata && (
                <ul>
                  <li className="dropdown">
                    <i className="fa fa-shopping-cart" style={{ fontSize: '37px', color: 'white' }} aria-hidden="true"></i>
                    <ul>
                      <li>
                        <Link to="/cartdata" className="nav-link scrollto">Service Cart
                          <label className="labelcartservices">{service.length}</label>
                        </Link>
                      </li>
                      <li>
                        <Link to="/productcartdata" className="nav-link scrollto">Product Cart
                          <label className="labelcartproduct">{product.length}</label>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown">
                    <i className="fa fa-heart" style={{ fontSize: '29px', color: 'white' }} aria-hidden="true"></i>
                    <ul>
                      <li>
                        <Link to="/servicewishlist" className="nav-link scrollto">Service Wishlist
                          <label className="labelcartservices">{serviceWishlist.length}</label>
                        </Link>
                      </li>
                      <li>
                        <Link to="/productwishlist" className="nav-link scrollto">Product Wishlist
                          <label className="labelcartproduct">{wishlist.length}</label>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
              {userdata ? (
                <button className="btn2" onClick={logout}>Logout</button>
              ) : (
                <a className="btn2" href="/Login">Login</a>
              )}
              {userdata && (
                <Link to="/Userprofile" className="nav-link scrollto">
                  <img src="%PUBLIC_URL%/../../Gp/assets/img/2022-03-14 (2).png" style={{ borderRadius: '7px', marginRight: '52px' }} height="40px" width="40px" />
                </Link>
              )}
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
      <Outlet />
      <Script />
    </>
  );
}

export default Header;
