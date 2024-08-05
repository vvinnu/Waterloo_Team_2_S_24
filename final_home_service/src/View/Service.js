import React, { useState, useEffect } from "react";
import Script from './Script/script.js'
import { Link } from 'react-router-dom';
import Notification from './Notification/customisenoti';

function Service() {

  let userdata = JSON.parse(localStorage.getItem('user'));
  console.log("USER profile DATA");
  console.log(userdata);

  const [servicelist, setservicelist] = useState([]);
  const [userwishlist, setuserwishlist] = useState([]);
  const [response, setResponse] = useState(0);
  const getservice = () => {
    if(userdata=null){
    let formdate = {
      u_id: JSON.parse(localStorage.getItem('user')).u_id,
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(formdate),
      headers: { "Content-Type": "application/json" }
    };
    fetch('http://localhost:3001/getservice',requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("Service");
        console.log(data);
        setservicelist(data);
      })
    }
    else{
      fetch('http://localhost:3001/getservicenotlogin')
      .then(response => response.json())
      .then(data => {
        console.log("Service");
        console.log(data);
        setservicelist(data);
      })
    }
  }

  const wishlist = (id) => {

    // e.preventDefault();
    let formdate = {
      sid: id,
      u_id: JSON.parse(localStorage.getItem('user')).u_id,
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(formdate),
      headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3001/serwishlist', requestOptions)
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
    getservice();
    
  }, [response]);

  return <>
    <div className="space">
      <section id="dvn" className="dvn">
        <div className="container" data-aos="fade-up">

          <div className="section-title" id="teamh2">
            <h2>Services</h2>
            <br />
            <p>Check our Services</p>
          </div>
          <br />
          <div className="row">
            {servicelist && servicelist.map((val, i) => {
              return (
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch" id="servicesbox">
                  <div data-aos="fade-up" data-aos-delay="100">

                    <div className="slide-img">
                      <img src={`http://127.0.0.1:3001/images/${val.img ? val.img : '123.jpg'}`} height="250px" className="imgheiht" alt="" />
                      <div className="overlay">
                        {
                          val.status == 0 ? <div style={{ color: 'white', fontSize: '20px', textAlign: 'center', paddingTop: '2px' }} className="buy-btn1">Service not <br />available now </div> : <><div><Link to={`/servicedetail/${val.s_id}`} className="buy-btn">Book Service</Link></div></>
                        }
                      </div>


                      <div className="detail-box">
                        <div className="type">
                          <h4>{val.s_name}</h4>
                         
                          <i className='fa' style={{ fontSize: '30px', marginLeft: '124px' }}>&#36; {val.s_price}</i>  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                          &nbsp;  &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
{userdata!=null?

  val.wishlist == null ?
    <i style={{ fontSize:'24px', cursor: 'pointer' ,color:'black',marginBottom:'6px',marginRight:'6px'}} className="fa fa-heart-o" onClick={() => wishlist(val.s_id)}></i>:
    <i style={{ fontSize:'24px', cursor: 'pointer' , color:'red',marginBottom:'6px',marginRight:'6px'}} className="fa fa-heart" onClick={() => wishlist(val.s_id)}></i>
:
<></>
}
                          
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
  </>
}

export default Service