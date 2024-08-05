import React, { useEffect, useState } from "react";
import SimpleReactValidator from 'simple-react-validator';
import Notification from '../Notification/customisenoti';
import { Navigate, useNavigate } from 'react-router-dom';

function Adminreg() {
  const navigate = useNavigate();
  const [regadmin, setregadmin] = useState([]);
  const [submit, setsubmit] = useState(0);

  const getregadmin = () => {
    fetch('http://localhost:4001/getregadmin')
      .then(response => response.json())
      .then(data => {
        console.log("profile");
        console.log(data);
        setregadmin(data);
      })
  }
  const [adminreg, setadminreg] = useState({});
  const [error, setError] = useState({});
  const changeData = (event) => {
    //console.log(event.target.name);
    //console.log(event.target.value);
    setadminreg({
      ...adminreg,

      [event.target.name]: event.target.value,
    });

  }
  const validator = new SimpleReactValidator();

  const submitData = (e) => {
    e.preventDefault();
    console.log("adminlo");
    console.log(adminreg);
    if (validator.allValid()) {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(adminreg),
        headers: { "Content-Type": "application/json" }
      };
      console.log("adminlo");
      console.log(requestOptions);
      fetch('http://localhost:4001/adminreg', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.id);
          if (data.status == 'Success') {
            setsubmit((submit) => submit + 1);
            Notification({ message: data.message, position: 'right', type: 'success' });
            navigate('/Login');
          }
          else {
            Notification({ message: data.message, position: 'right', type: 'error' });
          }
        });
    }
    else {
      Notification({ message: "Please_fill_data", position: 'right', type: 'error' });
    }
  }
  useEffect(() => {

  }, [submit]);


  return <>

    <div className="container-scroller">

      <div className="container-fluid page-body-wrapper">


        <div className="main-panel">
          <div className="content-wrapper" id="service">
            <div className="page-header">
              <h3 className="page-title" style={{ marginLeft: '430px', fontSize: '25px' }}>Registration</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  {/* <li className="breadcrumb-item"><a href="#">Forms</a></li> */}
                  {/* <li className="breadcrumb-item active" aria-current="page">Login</li> */}
                </ol>
              </nav>
            </div>
            <div class="col-6 grid-margin stretch-card" style={{ marginLeft: '236px' }}>
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title"></h4>
                  <p class="card-description">  </p>
                  <form class="forms-sample">


                    <div class="form-group">
                      <label for="exampleInputEmail3">Name</label>
                      <input type="text" class="form-control" id="exampleInputEmail3" name="name" placeholder="Name" onChange={changeData} />
                      <span style={{ color: 'red' }}>{validator.showMessageFor('name')}{validator.message('name', adminreg.name, 'required')}</span>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Email</label>
                      <input type="email" class="form-control" id="exampleInputEmail3" name="email" placeholder="Email" onChange={changeData} />
                      <span style={{ color: 'red' }}>{validator.showMessageFor('email')}{validator.message('email', adminreg.email, 'required|email')}</span>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword4" name="password" placeholder="Password" onChange={changeData} />
                      <span style={{ color: 'red' }}>{validator.showMessageFor('password')}{validator.message('password', adminreg.password, 'required|min:4')}</span>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">Confirm Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword4" name="rpassword" placeholder="Confirm Password" onChange={changeData} />
                      <span style={{ color: 'red' }}>{validator.showMessageFor('rpassword')}{validator.message('rpassword', adminreg.rpassword, 'required|min:4')}</span>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">Mobile No</label>
                      <input type="tel" class="form-control" id="exampleInputPassword4" name="phone" placeholder="Mobile No" onChange={changeData} />
                      <span style={{ color: 'red' }}>{validator.showMessageFor('phone')}{validator.message('phone', adminreg.phone, 'required')}</span>
                    </div>
                    <div class="form-group">


                    </div>


                    <div class="text-center">
                      <button type="submit" class="btn btn-primary btn-block enter-btn" onClick={submitData} style={{ padding: '12px', fontSize: '19px' }}>Register</button>
                    </div>
                    <div class="link">

                      <p class="sign-up"><a href="#"> Already Member?</a></p>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}


export default Adminreg