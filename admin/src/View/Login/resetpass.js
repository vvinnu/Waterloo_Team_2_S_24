import React ,{useState} from 'react';
import Notification from '../Notification/customisenoti';
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

function Resetpass() {
    const navigate = useNavigate();
    const validator = new SimpleReactValidator();
    const [passform,setPassForm]=useState();
    const setpassword =(e)=>{
        setPassForm({
            ...passform,
            [e.target.name]:e.target.value,
        });
    }
    const setnewpassword = ()=>{
        console.log(passform);
        if(passform.password==passform.cpassword)
        {
            let formdata=new FormData();
            formdata.append('otp',localStorage.getItem('otp'));
            formdata.append('password',passform.password);
            let option={
                method:'POST',
                body:formdata,
            };
            fetch('http://localhost:5050/adminupdatepassword',option)
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.status=='success')
                {   
                    localStorage.removeItem('otp');
                    Notification({ message: data.message, position: 'right', type: 'success' });
                    navigate('/Login');
                }
                else{
                    Notification({ message: data.message, position: 'right', type: 'error' });
                }
            });
        }   
        else{
          Notification({ message: "Password and Re-password are not match...!", position: 'right', type: 'error' });
        }

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
        <div class="col-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Reset Password</h4>
                    <p class="card-description">  </p>
                    <form class="forms-sample">
                      {/* <div class="form-group">
                        <label for="exampleInputName1">Name</label>
                        <input type="text" class="form-control" id="exampleInputName1" name="name" placeholder="Name" />
                      </div> */}
                      <div class="form-group">
                        <label for="exampleInputEmail3">New Password</label>
                        <input type="password" class="form-control" id="exampleInputEmail3" name="password" placeholder="New Password" onChange={setpassword}/>
                        {/* <span style={{color:'red'}}>{validator.showMessageFor('password')}{validator.message('password', passform.password, 'required')}</span> */}
                        
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail3">Confirm Password</label>
                        <input type="password" class="form-control" id="exampleInputEmail3" name="cpassword" placeholder="Confirm Passwor" onChange={setpassword}/>
                        {/* <span style={{color:'red'}}>{validator.showMessageFor('cpassword')}{validator.message('cpassword', passform.cpassword, 'required')}</span> */}
                      </div>
                      
                      <div class="d-flex">
                      <button class="btn btn-google mr-2 col">
                     Cancel</button> 

                     <input className="btn btn-facebook  col" type="button" value="Send" width="10px" onClick={setnewpassword} style={{color:'black'}}  />
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

export default Resetpass