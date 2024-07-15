import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Script from './Script/Script.js';
import Notification from './Notification/customisenoti';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate } from 'react-router-dom';

function Password() {
const navigate=useNavigate()
  let userdata = JSON.parse(localStorage.getItem('user'));
  console.log("USER profile DATA");
  console.log(userdata);
 
  const [profile, setProfile] = useState({});
  const validator = new SimpleReactValidator();

	const changeData = (event) => {
		console.log(event.target);
		console.log(event.target.value);
		setProfile({
			...profile,
			[event.target.name]: event.target.value,
		});
 }
	const submitData = (e) => {
		e.preventDefault();
    console.log("user");
    console.log(userdata.a_password);
    console.log("user");
    console.log(profile.password);
    if(userdata.a_password == profile.password){
        
         if(profile.npassword == profile.cpassword)
         {
          //  localStorage.removeItem('user');
          let data = new FormData();
          console.log("Form data");
          console.log(profile);
          data.append('a_id',userdata.a_id);
           data.append('npassword', profile.npassword);
           console.log("formdata");
           console.log(data);
           
          let option = {
            method: 'POST',
            body: data
          }
          console.log("option");
          console.log(option);
          fetch('http://localhost:5050/updateadminpassword', option)
            .then(response => response.json())
            .then(data => {
              // console.log(data.id);
              console.log(JSON.stringify(data.user));
              if (data.status == 'Sucsess') {
                  Notification({ message: data.message, position: 'right', type: 'success' });
                  localStorage.setItem('user', JSON.stringify(data.user));
                  navigate('/')
                  setProfile({});
                  // window.location.reload();
                }
                else {
                
                  Notification({ message: data.message, position: 'right', type: 'error' });
                }
            });
         }
         else{
           
           Notification({ message: 'Password is not match..!', position: 'right', type: 'error' });
         }
       }
    else{
      Notification({ message: 'Password is not match..!', position: 'right', type: 'error' });
    }
    
  }

	// }
useEffect(()=>{
    setProfile({});
  // console.log(localStorage.setItem('profile',JSON.stringify(profile)));
  console.log(localStorage.getItem('user'));
}, [])

    return <>
     <div className="container-scroller">

<div className="container-fluid page-body-wrapper">


  <div className="main-panel">
    <div className="content-wrapper" id="service">
      <div className="page-header">
        <h3 className="page-title"> Admin </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {/* <li className="breadcrumb-item"><a href="#">Forms</a></li> */}
            <li className="breadcrumb-item active" aria-current="page">Admin </li>
          </ol>
        </nav>
      </div>
        <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                  <ul className="nav nav-tabs">
                <li className="nav-item"><a href="/Admindata" className="active nav-link" >Settings</a></li>
                <li className="nav-item"><a href="/password" className="active nav-link" >Change password</a></li>
              </ul>
        
                    <p class="card-description">  </p>
                    <form class="forms-sample">
                      {/* <div class="form-group">
                        <label for="exampleInputName1">Name</label>
                        <input type="text" class="form-control" id="exampleInputName1" name="name" placeholder="Name" />
                      </div> */}
                      <div class="form-group">
                        <label for="exampleInputEmail3">Current Password</label>
                        <input type="password" class="form-control" id="exampleInputEmail3" name="password" placeholder="Current Password" value={profile.password ? profile.password : ""} onChange={changeData}/>
                        <span style={{ color: 'red' }}>{validator.showMessageFor('name')}{validator.message('password', profile.password, 'required|numeric|min:4')}</span>
                      </div>

                      <div class="form-group">
                        <label for="exampleInputEmail3">New Password</label>
                        <input type="password" class="form-control" id="exampleInputEmail3" name="npassword" placeholder="New Password" value={profile.npassword ? profile.npassword : ""} onChange={changeData} />
                        <span style={{ color: 'red' }}>{validator.showMessageFor('npassword')}{validator.message('npassword', profile.npassword, 'required|numeric|min:4')}</span>
                      </div>

                      <div class="form-group">
                        <label for="exampleInputEmail3">Confirm Password</label>
                        <input type="password" class="form-control" id="exampleInputEmail3" name="cpassword" placeholder="Confirm Password" value={profile.cpassword ? profile.cpassword : ""} onChange={changeData}/>
                        <span style={{ color: 'red' }}>{validator.showMessageFor('cpassword')}{validator.message('cpassword', profile.cpassword, 'required|numeric|min:4')}</span>

                      </div>
                      
                      <div class="d-flex">
                      <button class="btn btn-facebook mr-2 col" onClick={submitData}>
                     Save changes</button> 

              
                  </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
        </div>
    </>;

}
export default Password