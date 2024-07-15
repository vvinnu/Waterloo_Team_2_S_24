import React ,{useEffect, useState} from 'react';
import Notification from '../Notification/customisenoti';
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

function Otp() {
  const navigate=useNavigate();
  const validator = new SimpleReactValidator();
    const [setotp,setOtp]=useState('');
    const submitotp = ()=>{
      console.log("ENTER OTP");
      console.log(setotp);
      if(localStorage.getItem('otp')==setotp)
      {
        Notification({ message: 'Valid OTP', position: 'right', type: 'success' });
        navigate('/Resetpass');
      }
      else
      {
        Notification({ message: 'Please Enter valid OTP', position: 'right', type: 'error' });
        // alert("Please Enter valid OTP");
      }
    }
    
    useEffect(()=>{
      console.log(localStorage.getItem('otp'));
    },[]);
    return <>

        <div className="container-scroller">

<div className="container-fluid page-body-wrapper">


  <div className="main-panel">
  <div className="content-wrapper" id="service">
      <div className="page-header">
        
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {/* <li className="breadcrumb-item"><a href="#">Forms</a></li> */}
            {/* <li className="breadcrumb-item active" aria-current="page">Login</li> */}
          </ol>
        </nav>
      </div>
        <div class="col-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title"></h4>
                    <p class="card-description">  </p>
                    <form class="forms-sample">
                    <h6>Please enter the one time password <br/> to verify your account</h6>
                      {/* <div class="form-group">
                        <label for="exampleInputName1">Name</label>
                        <input type="text" class="form-control" id="exampleInputName1" name="name" placeholder="Name" />
                      </div> */}
                      <div class="form-group">
                        <label for="exampleInputEmail3"></label>
                        <input type="text" class="form-control"  name="otp" placeholder="Enter OTP" onChange={(e)=>setOtp(e.target.value)}/>
                        <span style={{color:'red'}}>{validator.showMessageFor('otp')}{validator.message('otp', setotp.otp, 'required')}</span>
                      </div>
                      <div class="d-flex">
                   
                    <input className="btn btn-facebook  col" type="button" value="Validate" width="10px" onClick={submitotp} style={{color:'black'}}  />
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

export default Otp