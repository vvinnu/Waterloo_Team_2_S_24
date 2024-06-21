import React ,{useState} from 'react';
// import {Link,useParams,useRouteMatch,Route,Switch,BrowserRouter} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/customisenoti';
import SimpleReactValidator from 'simple-react-validator';
function Forgot() {
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const validator = new SimpleReactValidator();
    localStorage.removeItem('otp');
    const backfromhere = ()=>{
      navigate('/Login')
    }
    const sendotp=()=>{
      
        let formdata=new FormData();
        formdata.append('email',email);
        let option={
            method:'POST',
            body:formdata,
        }
        fetch('http://localhost:5050/adminsendotp',option)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.status=='success')
            {
               
                localStorage.setItem('otp',data.otp);
                Notification({ message: data.message, position: 'right', type: 'success' });
                navigate('/Otp');
            }   
            else{
                Notification({ message: data.message, position: 'right', type: 'error' });
            }
        });
    }
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
        <div className="col-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Forgot Password</h4>
                    <p className="card-description">  </p>
                    <form className="forms-sample">
                      {/* <div className="form-group">
                        <label for="exampleInputName1">Name</label>
                        <input type="text" className="form-control" id="exampleInputName1" name="name" placeholder="Name" />
                      </div> */}
                      <div className="form-group">
                        <label for="exampleInputEmail3">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail3" name="Email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                        <span style={{color:'red'}}>{validator.showMessageFor('Email')}{validator.message('Email', email.email, 'required|eamil')}</span>
                      </div>
                      
                      <div className="d-flex">
                      <button onClick={backfromhere} className="btn btn-google mr-2 col">Cancel</button> 

                    <input className="btn btn-facebook  col" type="button" value="Send" width="10px" onClick={sendotp} style={{color:'black'}}  />
                   
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

export default Forgot