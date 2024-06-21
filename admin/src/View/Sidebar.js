import React from "react";
import Script from "./Script/Script";
import { Link, Outlet } from "react-router-dom";
class Sidebar extends React.Component {
  render() {
    return <>

      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="/"><img src="%PUBLIC_URL%/../../Admin/assets/images/logo1.png" alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="/"><img src="%PUBLIC_URL%/../../Admin/assets/images/logo-mini.svg" alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
             

              <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
                <a href="#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-primary"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword  text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">Change Password</p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar-today text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">To-do list</p>
                  </div>
                </a>
              </div>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">Navigation</span>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="/">
              <span className="menu-icon">
                <i className="fa fa-tachometer"></i>
              </span>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>

          <li className="nav-item menu-items">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <span className="menu-icon">
                <i className="fa fa-map-marker"></i>
              </span>
              <span className="menu-title">Location</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/Country" >Country</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/State" >State</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/City" >City</Link>
                </li>
              </ul>
            </div>
          </li>



          {/* <li className="nav-item menu-items">
            <Link className="nav-link" to="/Login" >
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title">Login</span>
            </Link>
          </li> */}

          <li className="nav-item menu-items">
            <Link className="nav-link" to="/Category" >
              <span className="menu-icon">
                <i className="fa fa-list-alt"></i>
              </span>
              {/* <Link to="/Category" className="menu-title">Category</Link> */}
              <span className="menu-title">Category</span>
            </Link>
          </li>
          <li className="nav-item menu-items">
            <Link className="nav-link" to="/Services" >
              <span className="menu-icon">
                <i className="fa fa-wrench"></i>
              </span>
              {/* <Link to="/Services" className="menu-title">Services</Link> */}
              <span className="menu-title">Services</span>
            </Link>
          </li>

          <li className="nav-item menu-items">
            <Link className="nav-link" to="/Booking" >
              <span className="menu-icon">
                <i className="fa fa-book"></i>
              </span>
              <span className="menu-title">Booking</span>
            </Link>
          </li>

          <li className="nav-item menu-items">
            <Link className="nav-link" to="/Product" >
              <span className="menu-icon">
                <i className="fa fa-product-hunt"></i>
              </span>
              <span className="menu-title">Product</span>
            </Link>
          </li>

          <li className="nav-item menu-items">
            <Link className="nav-link" to="/orderdetail" >
              <span className="menu-icon">
                <i className="fa fa-first-order"></i>
              </span>
             
              <span className="menu-title">Orders</span>
            </Link>
          </li>

          <li className="nav-item menu-items">
            <Link className="nav-link" to="/coupon" >
              <span className="menu-icon">
                <i className="fa fa-gift"></i>
              </span>
              <span className="menu-title">Coupon</span>
            </Link>
          </li>
          
          <li className="nav-item menu-items">
            <Link className="nav-link" to="/Userdata" >
              <span className="menu-icon">
                <i className="fa fa-user"></i>
              </span>
              <span className="menu-title">Userdata</span>
            </Link>
          </li>
          <li className="nav-item menu-items">
            <Link className="nav-link" to="/Contactdata" >
              <span className="menu-icon">
                <i className="fa fa-envelope"></i>
              </span>
              <span className="menu-title">Messages</span>
            </Link>
          </li>

          <li className="nav-item menu-items">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <span className="menu-icon">
                <i className="fa fa-heart"></i>
              </span>
              <span className="menu-title">Wishlist</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/Serwishlist" >Services</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/prowishlist" >Products</Link>
                  </li>
              </ul>
            </div>
          </li>

          <li className="nav-item menu-items">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <span className="menu-icon">
                <i className="fa fa-comments-o"></i>
              </span>
              <span className="menu-title">Feedback</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
        
                  <Link className="nav-link" to="/serfeedback" >Services</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profeedback" >Products</Link>
                  </li>
              </ul>
            </div>
          </li>
       

        

          {/* <li className="nav-item menu-items">
            <Link className="nav-link" to="/Admin" >
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title">Admin Profile</span>
            </Link>
          </li> */}
         

       
          
          

          {/* 
          <li className="nav-item menu-items">
            <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title">User Pages</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="auth">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/samples/blank-page.html"> Blank Page </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
              </ul>
            </div>
          </li> */}
          {/* <li className="nav-item menu-items">
            <a className="nav-link" href="http://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title">Documentation</span>
            </a>
          </li> */}
        </ul>
      </nav>
      <Outlet />
      <Script />
    </>
  }
}

export default Sidebar;