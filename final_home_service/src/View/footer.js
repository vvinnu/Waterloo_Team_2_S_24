import react from "react";
import Script from './Script/script.js';

class Footer extends react.Component {
 
  render(){
   
   return <>


      <footer id="footer">
<div className="footer-top">
  <div className="container">
    <div className="row">

      <div className="col-lg-3 col-md-6">
        <div className="footer-info">
        <a href="/" className="logo me-auto me-lg-0"><img src="%PUBLIC_URL%/../../Gp/assets/img/logo4-removebg-preview.png" alt="" height="50px"  /></a>
        <br /><br />
          <p>
                    221 King street,<br />
                    Waterloo,<br />
                    Ontario,N2B 1G1<br /><br />
                    <strong>Phone:</strong> +1 4354626492<br />
                    <strong>Email:</strong> support@homeservice.org<br />
          </p>
        </div>
      </div>

      <div className="col-lg-2 col-md-6 footer-links">
        <h4>Useful Links</h4>
        <ul>
          <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
          <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
          <li><i className="bx bx-chevron-right"></i>  <a href="/Service">Services</a></li>
          <li><i className="bx bx-chevron-right"></i> <a href="/Product">Product</a></li>
          <li><i className="bx bx-chevron-right"></i> <a href="/team"> Team </a></li>
          <li><i className="bx bx-chevron-right"></i> <a href="/Contact"> Contact </a></li>
        </ul>
      </div>

      <div className="col-lg-3 col-md-6 footer-links">
        <h4>Our Services & Products Photos</h4>
        <ul>
          <li><i className="bx bx-chevron-right"></i> <a href="/Service" style={{cursor:'pointer'}}>Cleaning</a></li>
          <li><i className="bx bx-chevron-right"></i> <a href="/Service" style={{cursor:'pointer'}}>Painting</a></li>
          <li><i className="bx bx-chevron-right"></i> <a href="/Service" style={{cursor:'pointer'}}>Beautic</a></li>
          <li><i className="bx bx-chevron-right"></i> <a href="/Product" style={{cursor:'pointer'}}>Bath Cleanning Brush</a></li>
          <li><i className="bx bx-chevron-right"></i> <a href="/Product" style={{cursor:'pointer'}}>Dustbin</a></li>
          <li><i className="bx bx-chevron-right"></i> <a href="/Product" style={{cursor:'pointer'}}>Soap</a></li>
        </ul>
      </div>

      <div className="col-lg-4 col-md-4 footer-newsletter" id="footerimg">
      <a href="/Service" ><img src="%PUBLIC_URL%/../../Gp/assets/img/project-03-800x715.jpg" width="160px" id="footerimg" style={{cursor:'pointer'}}/></a>
      <a href="/Service" ><img src="%PUBLIC_URL%/../../Gp/assets/img/project-06-800x715.jpg" width="160px" id="footerimg" style={{cursor:'pointer'}}/><br/></a>
      <a href="/Service" ><img src="%PUBLIC_URL%/../../Gp/assets/img/project-01-800x715.jpg" width="160px" id="footerimg" style={{cursor:'pointer'}}/></a>
      <a href="/Service" ><img src="%PUBLIC_URL%/../../Gp/assets/img/project-02-800x715.jpg" width="160px" id="footerimg"/></a>
      </div>

    </div>
  </div>
</div>
</footer>
<Script/>
    </>}
}

export default Footer