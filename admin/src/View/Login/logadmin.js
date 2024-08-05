import React, { useState , useEffect } from 'react';
import Notification from '../Notification/customisenoti';
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
function Logadmin() {

  const navigate = useNavigate();
    const [adminlog, setadminlog] = useState({});
    const [submit, setsubmit] = useState(0);
    const validator = new SimpleReactValidator();
    //   const [error, setError] = useState({});  
    const changeData = (event) => {
        //console.log(event.target.name);
        //console.log(event.target.value);
        setadminlog({
            ...adminlog,

            [event.target.name]: event.target.value,
        });

   }
    // const validator = new SimpleReactValidator();

    const submitData = (e) => {
        e.preventDefault();
        console.log("adminlo");
        console.log(adminlog);
        // if (validator.allValid()) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(adminlog),
            headers: { "Content-Type": "application/json" }
        };
        console.log("adminlo");
        console.log(requestOptions);
        fetch('http://localhost:4001/adminlog', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.id);
                if (data.status == 'Success') {
                    setsubmit((submit) => submit + 1);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    navigate('/');
                    window.location.reload();
                }
                else {
                    Notification({ message: data.message, position: 'right', type: 'error' });
                    localStorage.removeItem('user');
                }
            });
        }
        useEffect(() => {
         
        }, [submit]);
    
    return <>

<div className="container-scroller">

<div className="container-fluid page-body-wrapper">


  <div className="main-panel">
  <div className="content-wrapper" id="service">
      <div className="page-header">
        <h3 className="page-title" style={{marginLeft: '442px',fontSize: '25px'}}>Login </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {/* <li className="breadcrumb-item"><a href="#">Forms</a></li> */}
            {/* <li className="breadcrumb-item active" aria-current="page">Login</li> */}
          </ol>
        </nav>
      </div>
        <div class="col-6 grid-margin stretch-card" style={{marginLeft: '220px'}}>
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title"></h4>
                    <p class="card-description">  </p>
                    <form class="forms-sample">
                      {/* <div class="form-group">
                        <label for="exampleInputName1">Name</label>
                        <input type="text" class="form-control" id="exampleInputName1" name="name" placeholder="Name" />
                      </div> */}
                      <div class="form-group">
                        <label for="exampleInputEmail3">Username</label>
                        <input type="email" class="form-control" id="exampleInputEmail3" name="username" placeholder="Username" onChange={changeData}/>
                        <span style={{color:'red'}}>{validator.showMessageFor('username')}{validator.message('username', adminlog.username, 'required')}</span>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword4">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword4" name="password" placeholder="Password" onChange={changeData}/>
                        <span style={{color:'red'}}>{validator.showMessageFor('password')}{validator.message('password', adminlog.password, 'required|min:4')}</span>
                      </div>
                      <div class="form-group">
                       
                        
                   </div>
                      
                      <div class="form-group d-flex align-items-center justify-content-between">
                    <div class="form-check">
                      <label class="form-check-label" style={{fontSize:'14px',marginTop: '-18px',marginLeft: '-30px'}}>
                        <input type="checkbox" class="form-check-input" /> Remember me </label>
                    </div>
                    <a href="/forgot" class="forgot-pass" style={{fontSize:'16px',marginTop: '-18px',marginLeft: '-30px'}}>Forgot password</a>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-block enter-btn" onClick={submitData} style={{padding:'11PX',marginTop:'10px',fontSize:'21px'}}>Login</button>
                  </div>
                  <div class="link">
                  <p class="sign-up">Don't have an Account?<a href="/adminreg" > Sign Up</a></p>
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


export default Logadmin