import React, { useState, useEffect } from "react";
import Script from './Script/script.js'
import { Link } from 'react-router-dom';
import Notification from './Notification/customisenoti';

function Product() {
  let userdata = JSON.parse(localStorage.getItem('user'));
  console.log("USER profile DATA");
  console.log(userdata);

  const [productlist, setproductlist] = useState([]);
  const [response, setResponse] = useState(0);
  const getproduct = () => {
    if(userdata=null){
    let formdate = {
    
      u_id: JSON.parse(localStorage.getItem('user')).u_id,
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(formdate),
      headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3001/getproduct', requestOptions)

      .then(response => response.json())
      .then(data => {
        console.log("product");
        console.log(data);
        setproductlist(data);
      })
    }
    else{
      fetch('http://localhost:3001/getproductnotuser')

      .then(response => response.json())
      .then(data => {
        console.log("product");
        console.log(data);
        setproductlist(data);
      })
    }
  }
  const wishlist = (id) => {
    let formdate = {
      pid: id,
      u_id: JSON.parse(localStorage.getItem('user')).u_id,
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(formdate),
      headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3001/prowishlist', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (data.status == 'success') {
          setResponse((response) => response + 1);
          Notification({ message: data.message, position: 'right', type: 'success' });
        }
        else {
          Notification({ message: data.message, position: 'right', type: 'error' });
        }
      })

  }
  useEffect(() => {
    getproduct();
  }, [response]);

  return <>
    <div className="space">
      <section id="miniservice" className="miniservice">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2 >Products</h2>
            <p>Check our Products</p>
          </div>

          <div className="row">
            {productlist && productlist.map((val, i) => {
              return (
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch" id="servicesbox">
                  <div data-aos="fade-up" data-aos-delay="100">

                    <div className="slide-img">
                      <img src={`http://127.0.0.1:3001/images/${val.p_image ? val.p_image : '123.jpg'}`} height="250px" className="imgheiht" alt="" />
                      <div className="overlay">
                      {
                          val.qty == 0 ? <div style={{ color: 'white', fontSize: '20px', textAlign: 'center', paddingTop: '2px',marginTop: '89px',width: '132px',height: '35px',borderRadius: '12px' }} className="buy-btn1">Out of Stoke </div> : <><div> <Link to={`/productdetail/${val.p_id}`} className="buy-btn">View Product</Link></div></>
                        }
                       

                      </div>
                      <div className="detail-box">
                        <div className="type">
                          <h4 style={{ marginBottom: '5px' }}>{val.p_name}</h4>
                          <i className='fa fa-rupee' style={{ fontSize: '25px', padding: '5px', marginLeft: '124px' }}>{val.p_price}</i>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                          &nbsp;  &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                          {userdata!=null?
                          
                            val.wishlist == null ? <i style={{ fontSize: '24px', cursor: 'pointer', color: 'black' }} className="fa fa-heart-o" onClick={() => wishlist(val.p_id)}></i> : <i style={{ fontSize: '24px', cursor: 'pointer', color: 'red' }} className="fa fa-heart" onClick={() => wishlist(val.p_id)}></i>
                          :<></>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>

    <Script />
  </>;
}

export default Product