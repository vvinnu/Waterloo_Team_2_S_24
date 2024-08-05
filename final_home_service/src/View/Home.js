import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import Script from './Script/script.js';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [categorylist, setCategoryList] = useState([]);
  const [search, setSearch] = useState('');


  const getcategory = () => {

    fetch('http://localhost:3001/getcategory')
      .then(response => response.json())
      .then(data => {
        setCategoryList(data);
      })
  }

 
  const submitData = (e) => {
    if (search != '') {
      navigate(`/search/${search}`);
    }
    else {
      navigate(`/search/all`);
    }

  }
  useEffect(() => {
    getcategory();
  }, []);
  return <>
    <Helmet>
      <title> Home Services</title>
    </Helmet>
    <div className='space' style={{ marginBottom: '-47px' }}>
      <section id="hero" className="d-flex align-items-center justify-content-center">
        <video autoPlay loop muted
          style={{
            marginTop: '31px',
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: "cover",
            Transform: 'translate(-50%,-50%)',

          }}>
          <source src="./Gp/assets/img/cleaning.mp4" type="video/mp4" />

        </video>
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
            <div className="col-xl-12 col-lg-12">
              <br />
              <br />
              <br /><br /> <br />

              <h1 >We are providing our <br />best home service experiences </h1>

              <h4>We hope you like our services </h4>
            </div>
          </div><br />


          <a href="/Contact" className="get-started-btn scrollto" id="btncontect" style={{ animation: 'MoveUpDown2 3s linear infinite' }}>Contact us</a>
          <br /> <br />
        </div><br />

      </section><br />
      <br />
      <br /><br />


      <h1 className="mainntitle">Category List <div className="underline"><span></span></div></h1>

      <div className="containercat">

        <div className="row gy-4 justify-content-center" data-aos="zoom-in" data-aos-delay="250" >

          {categorylist && categorylist.map((val, i) => {
            return (
              <div className="col-xl-4 col-md-4" >
                <div className="thumbexcat">
                  <div className="thumbnailcat"><a href={`/Service/${val.c_id}`} >
                    <img src={`http://127.0.0.1:3001/images/${val.c_img ? val.c_img : '123.jpg'}`} height="100%" width="100%" />
                    <span>{val.c_name}</span> </a>
                  </div>
                </div>
              </div>
            )
          })}

        </div>

      </div>
      <br /><br /><br />


      <div className='servideo'>
        <br /><br />
        <h1 className="mainntitle1">SERVICEs PROVIDED  <div className="underline1"><span></span></div></h1>
        <div className="videodiv">
          <div className="vibox">
            <h2>
              FOR SERVICES & IMMEDIATE ATTENTION <br />24/7 </h2>

            <img src="./Gp/assets/img/img4.png" style={{ animation: ' tada 1.5s ease infinite' }} />
            <p>CALL US NOW: <br />
              +1 4354626492</p>
          </div>
        </div>

        <video autoPlay loop muted className="postimg" poster="./Gp/assets/img/videobg.jpeg">
          <source src="./Gp/assets/img/newvideo.mp4" type="video/mp4" />

        </video>
        <br /><br /><br /><br />
      </div>


      <div className="container3">

        <div className="3boxes">
          <div className="boxes" style={{ width: '375PX' }}>

            <div style={{ paddingLeft: '50px' }}>
              <div className="conborder" >   </div>
              <img src="./Gp/assets/img/img1.png" />
            </div>
            <p className="contit">Experienced Staff
              <span className="conmintit">Professional and Experienced staff help <br /> you anytime.</span></p><br />
          </div>


        </div>



        <div className="boxes" style={{ width: '375PX' }}>
          <div style={{ paddingLeft: '58px' }}>
            <div className="conborder2" >   </div>
            <img src="./Gp/assets/img/img3.png" style={{ marginTop: '-151px', marginLeft: '81px' }} /></div>
          <p className="contit">Best Equipment
            <span className="conmintit">We use the best and world class equipment for cleaning.</span></p><br />
        </div>

      </div>

      <div className='bgbox'>
        <br />  <br />  <br />
        <h1 style={{ textAlign: "center", fontWeight: '700', textDecoration: 'underline', color: '#fba51a' }}>Our Workflow </h1>
        <p style={{ textAlign: "center", fontWeight: '600', fontSize: '20px' }}>"Enjoy Your Required Service At 3 Steps Ahead"</p>
        <div className="container2">
          <div className="box1">
            <div className="icon" style={{ animation: ' tada 1.5s ease infinite' }}>01</div>
            <div className="content">
              <img src="http://www.ezhomeservices.in/images/request.png" width="100px" />
              <p style={{ fontSize: '19px', fontWeight: '700', paddingLeft: '45px' }}>Schedule your services</p>
              <p style={{ fontSize: '15px', paddingLeft: '21px' }}>Fill Credential, Book Service & Relax</p>
            </div>
          </div>

          <div className="box1">
            <div className="icon" style={{ animation: ' tada 1.5s ease infinite' }}>02</div>
            <div className="content1">
              <img src="http://www.ezhomeservices.in/images/get-quote.png" width="100px" />
              <p style={{ fontSize: '19px', fontWeight: '700', paddingLeft: '58px', alignItem: 'center' }}>Service At Your Home</p>
              <p style={{ fontSize: '15px', alignItem: 'center', paddingLeft: '18px' }}>Keep Calm, We Will Serve At Your Door</p>
            </div>
          </div>



          <div className="box1">
            <div className="icon" style={{ animation: ' tada 1.5s ease infinite' }}>03</div>
            <div className="content2"><br />
              <img src="http://www.ezhomeservices.in/images/best.png" width="100px" />
              <br />
              <p style={{ fontSize: '19px', fontWeight: '700', alignItem: 'center', paddingLeft: '70px' }}>Pay After Service</p>
              <p style={{ fontSize: '15px', alignItem: 'center', paddingLeft: '39px' }}>Make Payment After Job Get Done</p>
            </div>
          </div>

        </div>
        <br /><br />
      </div>



      <br /><br />
      <div className="maindiv">

        <div className="site-heading text-center">
          <span className="site-title-tagline">Feature</span>
          <h2 className="site-title">Feature For You <div className="underline3"><span></span></div></h2>
          <div className="heading-divider"></div>
          <p>
            It is a long established fact that a reader will be distracted by the readable <br /> content
            of a page when looking at its layout.
          </p>
        </div>

        <div className="col-lg-4">
          <div className="top-feature-left">
            <div className="top-feature-wrapper">
              <div className="top-feature-item" style={{ paddingLeft: '30px' }}>
                <div className="image-circle1" style={{ width: '165px', height: '85px' }}>
                </div>
                <img src="./Gp/assets/img/plumbingimg.png" style={{ width: '75px', height: '75px', marginLeft: '-100px' }} />
                <div className="top-feature-content1">
                  <a href="#">
                    <h5>Plumbing Service</h5>
                  </a>
                  <p>Don’t put your life on hold for leaking faucet or water heater! </p>
                </div>
              </div>
              <div className="top-feature-item">
                <div className="top-feature-icon">
                  <i className="flaticon-clean"></i>
                </div>
                <div className="image-circle1" style={{ width: '146px', height: '85px' }}>
                  <i className="flaticon-sanitary"></i>
                </div>
                <img src="./Gp/assets/img/cleaningimg.png" style={{ width: '75px', height: '75px', marginLeft: '-100px' }} />
                <div className="top-feature-content1">
                  <a href="#">
                    <h5>Cleaning Service</h5>
                  </a>
                  <p> This is a more comprehensive clean than a basic clean.</p>
                </div>
              </div>
              <div className="top-feature-item">
                <div className="top-feature-icon">
                  <i className="flaticon-bubbles"></i>
                </div>
                <div className="image-circle1" style={{ width: '175px', height: '85px' }}>
                  <i className="flaticon-sanitary"></i>
                </div>
                <img src="./Gp/assets/img/laundryimg.png" style={{ width: '75px', height: '75px', marginLeft: '-100px' }} />

                <div className="top-feature-content1">
                  <a href="#">
                    <h5>Laundry Service</h5>
                  </a>
                  <p>Wash, dry, and fold clothes while cleaning the homeowner’s house.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="top-feature-middle">
            <div className="top-feature-img">
              <img src="./Gp/assets/img/cleaning-modified.png" alt="" style={{
                width: '296px', height: '305px', marginLeft: '406px', marginTop: '-480px', border: '4px solid #000',
                borderLeftWidth: '15px', borderRadius: '50%', padding: '10px', background: '#ffc109', padding: '10px 0px 10px 15px'
              }} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="top-feature-right">
            <div className="top-feature-wrapper">
              <div className="top-feature-item">

                <i className="flaticon-house"></i>
                <div className="image-circle1" style={{ width: '140px', height: '85px' }}>
                  <i className="flaticon-sanitary"></i>
                </div>
                <img src="./Gp/assets/img/propertyimg.png" style={{ width: '75px', height: '75px', marginLeft: '-100px' }} />

                <div className="top-feature-content">
                  <a href="#">
                    <h5>House Cleaning</h5>
                  </a>
                  <p> A service that involves general house cleaning jobs.</p>
                </div>
              </div>
              <div className="top-feature-item">
                <div className="top-feature-icon">
                  <i className="flaticon-presentation"></i>
                </div>
                <div className="image-circle1" style={{ width: '156px', height: '85px' }}>
                  <i className="flaticon-sanitary"></i>
                </div>
                <img src="./Gp/assets/img/exportcleanerimg.png" style={{ width: '75px', height: '75px', marginLeft: '-100px' }} />

                <div className="top-feature-content">
                  <a href="#">
                    <h5>Expert Cleaner</h5>
                  </a>
                  <p>All the orem generat tend to art repeat predefined chunks.</p>
                </div>
              </div>
              <div className="top-feature-item">
                <div className="top-feature-icon">
                  <i className="flaticon-team"></i>
                </div>
                <div className="image-circle1" style={{ width: '176px', height: '85px' }}>
                  <i className="flaticon-sanitary"></i>
                </div>
                <img src="./Gp/assets/img/onlinesupportimg.png" style={{ width: '75px', height: '75px', marginLeft: '-100px' }} />

                <div className="top-feature-content">
                  <a href="#">
                    <h5>24/7 Online Support</h5>
                  </a>
                  <p>24×7 Customer Care Centre is a well-known water purifier systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <main id="main">

      </main>

    </div>


    <Script />
  </>;
}

export default Home