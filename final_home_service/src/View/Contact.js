
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification/customisenoti';
import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import 'react-toastify/dist/ReactToastify.css';
import Script from './Script/script'

function Contact() {
  const navigate = useNavigate();
  const [res, setResponse] = useState(0);
  const [form, setform] = useState({});


  const changeData = (event) => {
    setform({
      ...form,

      [event.target.name]: event.target.value,
    });

  }
  const [formData, setnewFormData] = useState([]);
  const validator = new SimpleReactValidator();
  const submitData = (e) => {
    e.preventDefault();
    console.log("Contact");
    console.log(form);
   
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" }
      };
      fetch('http://localhost:3001/Contact', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.id);
          if (data.status == 'Success') {
            Notification({ message: data.message, position: 'right', type: 'success' });
            setform({});
            navigate('/Contact');
          }
          else {
            Notification({ message: data.message, position: 'right', type: 'error' });
          }
          setResponse(1);
        });
      
    }
    useEffect(() => {
      setform({});
    }, [res])
    return <>

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2 style={{marginTop:'68px',padding:'11px',marginLeft:'14px'}}>Contact</h2>
            <p style={{padding:'22px'}}>Contact Us</p>
          </div>
          <ToastContainer />
          <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2895.1139029471224!2d-80.51938219476094!3d43.47909326724113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1718912619478!5m2!1sen!2sca" style={{ border: '0', width: '100%', height: '270px' }} allowfullscreen="" loading="lazy"></iframe>
          </div>

          <div className="row mt-5">

            <div className="col-lg-4">
              <div className="info">
                <div className="address">
                  <i className="bi bi-geo-alt"></i>
                  <h4>Location:</h4>
                  <p>221 King street, Waterloo, Ontario, N2B 1G1</p>
                </div>

                <div className="email">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>support@homeservice.org</p>
                </div>

                <div className="phone">
                  <i className="bi bi-phone"></i>
                  <h4>Call:</h4>
                  <p>+1 4354626492</p>
                </div>

              </div>

            </div>

            <div className="col-lg-8 mt-5 mt-lg-0">

              <form method="post" role="form" className="php-email-form" >
                <div className="row">
                  <div className="col-md-6 form-group">

                    <input type="text" name="name" value={form.name ? form.name : ""} className="form-control" id="name" placeholder="Your Name" required onChange={changeData} />
                  </div>


                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" className="form-control" value={form.email ? form.email : ""} name="email" id="email" placeholder="Your Email" required onChange={changeData} />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" value={form.subject ? form.subject : ""} name="subject" id="subject" placeholder="Subject" required onChange={changeData} />
                </div>

                <div className="form-group mt-3">
                  <textarea className="form-control" name="message" value={form.message ? form.message : ""} rows="5" placeholder="Message" required onChange={changeData}></textarea>
                </div>
                <div className="text-center"><button type="submit" onClick={submitData}>Send Message</button></div>
              </form>

            </div>

          </div>

        </div>
      </section>
      <Script />
    </>;
  }


  export default Contact