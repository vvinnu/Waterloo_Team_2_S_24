import React ,{useEffect, useState} from 'react';
import Notification from '../Notification/customisenoti';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate } from 'react-router-dom';
import './log.css';
import './reg.css';
import './otp.css';
function Otp() {
  const navigate=useNavigate();
  const validator = new SimpleReactValidator();
    const [setotp,setOtp]=useState('');
    const submitotp = ()=>{
      if (validator.allValid()) {

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
        
      }
    }
    else{
      Notification({ message: "Please fill data", position: 'right', type: 'error' });
    }
  }
    
    useEffect(()=>{
      console.log(localStorage.getItem('otp'));
    },[]);
    return <>
        <div className="container height-100 d-flex justify-content-center align-items-center">
  <div className="position-relative">
    <div className="card p-2 text-center">
      <h6>Please enter the one time password <br/> to verify your account</h6>
     <br/>
      {/* <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2"> <input className="m-2 text-center form-control rounded" type="text" id="first" maxlength="1" /> <input className="m-2 text-center form-control rounded" type="text" id="second" maxlength="1" /> <input className="m-2 text-center form-control rounded" type="text" id="third" maxlength="1" /> <input className="m-2 text-center form-control rounded" type="text" id="fourth" maxlength="1" /> <input className="m-2 text-center form-control rounded" type="text" id="fifth" maxlength="1" /> <input className="m-2 text-center form-control rounded" type="text" id="sixth" maxlength="1" /> </div> */}
    <input type="text" name="otp" placeholder='Enter OTP' className='form-control' style={{width:'82%'}} onChange={(e)=>setOtp(e.target.value)}/>
     <input className="button1" type="button" value="Validate" onClick={submitotp} style={{color:'black'}} />
    </div>
  </div>
</div>
    </>;
}

export default Otp