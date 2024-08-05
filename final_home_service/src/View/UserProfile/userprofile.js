import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Script from '../Script/script.js';
import Notification from '../Notification/customisenoti';
import SimpleReactValidator from 'simple-react-validator';
function Userprofile() {

  const navigate = useNavigate();

  let userdata = JSON.parse(localStorage.getItem('user'));
  console.log("USER profile DATA");
  console.log(userdata);

  const validator = new SimpleReactValidator();
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('user')));

  const changeData = (event) => {
    console.log(event.target);
    console.log(event.target.value);
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  }

  const removeuser =()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
		localStorage.removeItem('productcart');
    navigate('/');
    window.location.reload();
  }
  const submitData = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      let data = new FormData();
      console.log("Form data");
      console.log(profile);
      data.append('u_id', userdata.u_id);
      data.append('firstname', profile.firstname);
      data.append('email', profile.email);
      data.append('lastname', profile.lastname);
      data.append('password', profile.password);
      data.append('conpassword', profile.conpassword);
      data.append('address', profile.address);
      console.log("formdata");
      console.log(data);
      let option = {
        method: 'POST',
        body: data
      }
      console.log("option");
      console.log(option);
      fetch('http://localhost:3001/updateprofile', option)
        .then(response => response.json())
        .then(data => {
          console.log(data.id);
          if (data.status == 'Sucsess') {
            Notification({ message: data.message, position: 'right', type: 'success' });
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          else {
            Notification({ message: data.message, position: 'right', type: 'error' });
          }
        });
    }
    else{
      Notification({ message: "Please fill data", position: 'right', type: 'error' });
    }

  }

  // }
  useEffect(() => {
    console.log(localStorage.setItem('profile', JSON.stringify(profile)));
  }, [profile])

  return <><br /><br /><br /><br /><br />
    <div className="container">


      <div className="row flex-lg-nowrap">
        <div className="col-12 col-lg-auto mb-3" style={{ width: '200px' }}>
          {/* <div className="card p-3">
      <div className="e-navlist e-navlist--active-bg"> */}
         
          <a href='/Userprofile'><img  src="%PUBLIC_URL%/../../Gp/assets/img/2022-03-14 (2).png" style={{ borderRadius: '32px' }} height="150px" width="150px" /></a>
          <br /><br />
          <div className="px-xl-3">
            


            <div className="sidebarName">
            <a href="/Userprofile"><i className="fa fa-fw fa-user"></i>Profile</a>
  <a href="/Userpass"><i className="fa fa-lock"></i>&nbsp; Password</a>
  <a href="/Bookingingdetail"><i className="fa fa-fw fa-wrench"></i> Services</a>
  <a href="/Myorder"><i className="fa fa-shopping-bag"></i> Order</a>
  <a onClick={removeuser}><i className="fa fa-sign-out" style={{cursor:'pointer'}}></i> LogOut</a>
          
            </div>
          </div>
          {/* </div>
    </div> */}
        </div>

        <div className="col">
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="e-profile">
                    <ul className="nav nav-tabs">
                      <li className="nav-item"><a href="/Userprofile" className="active nav-link" style={{ color: '#000000', fontWeight: 'bold' }}>Settings</a></li>
                      <li className="nav-item"><a href="/Userpass" className="active nav-link" style={{ color: '#000000', fontWeight: 'bold' }}>Change password</a></li>
                    </ul>

                    <div className="tab-content pt-3">
                      <div className="tab-pane active">
                        <form className="form" novalidate="">
                          <div className="row">
                            <div className="col">
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <label style={{ fontWeight: 'bold' }}>First Name</label>
                                    <input className="form-control" type="text" name="firstname" defaultValue={profile.firstname} onChange={changeData} />
                                  </div>
                                  <span style={{ color: 'red' }}>{validator.showMessageFor('firstname')}{validator.message('firstname', profile.firstname, 'required|string')}</span>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label style={{ fontWeight: 'bold' }}>Last Name</label>
                                    <input className="form-control" type="text" name="lastname" defaultValue={profile.lastname} onChange={changeData} />
                                  </div>
                                  <span style={{ color: 'red' }}>{validator.showMessageFor('lastname')}{validator.message('lastname', profile.lastname, 'required|string')}</span>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label style={{ fontWeight: 'bold' }}>Email</label>
                                    <input className="form-control" type="text" name="email" defaultValue={profile.email} onChange={changeData} />
                                  </div>
                                  <span style={{ color: 'red' }}>{validator.showMessageFor('email')}{validator.message('email', profile.email, 'required|email')}</span>
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col mb-3">
                                  <div className="form-group">
                                    <label style={{ fontWeight: 'bold' }}>Address</label>
                                    <textarea className="form-control" rows="4" name='address' placeholder="Address" defaultValue={profile.address} onChange={changeData}></textarea>
                                  </div>
                                  <span style={{ color: 'red' }}>{validator.showMessageFor('address')}{validator.message('address', profile.address, 'required')}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <br />


                          <div className="row">
                            <div className="col d-flex justify-content-end">
                              <button className="editbtn btn-warning" type="submit" onClick={submitData}>Save Changes</button>
                            </div>
                          </div>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <Script />
  </>;

}
export default Userprofile